import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GlobalBannerContext } from "../../utils/global-banner/global-banner.utils";
import { stripePromise } from "../../utils/stripe/stripe.utils";

import { clearAllItemsInCart } from "../../store/cart/cart.action";

import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { Spinner } from "../spinner/spinner.component";

import {
  CheckoutButton,
  FormContainer,
  PaymentButton,
  PaymentButtons,
  PaymentFormContainer,
} from "./payment-form.styles";

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const amount = useSelector(selectCartTotal);

  useEffect(() => {
    fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })
      .then((res) => res.json())
      .then(({ paymentIntent }) => {
        if (paymentIntent) {
          setClientSecret(paymentIntent.client_secret);
        }
      });
  }, [amount]);

  if (!clientSecret) {
    return <Spinner />;
  }

  const options = {
    mode: "payment",
    currency: "usd",
    amount: amount > 0 ? amount : 1,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm clientSecret={clientSecret} amount={amount} />
    </Elements>
  );
}

function PaymentForm({ clientSecret, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const { setGlobalBanner } = useContext(GlobalBannerContext);

  const [isProcesingPayment, setIsProcesingPayment] = useState(false);

  function goToCheckout() {
    navigate("/checkout");
  }

  async function paymentHandler(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcesingPayment(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(submitError);
      setIsProcesingPayment(false);
      return;
    }

    let returnUrl;
    if (process.env.NODE_ENV === "production") {
      returnUrl = "https://ebarr10-react-capstone.netlify.app/payment";
    } else {
      returnUrl = "http://localhost:8888/payment";
    }

    const { paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl,
      },
      redirect: "if_required",
    });

    if (paymentIntent.status === "succeeded") {
      setGlobalBanner("Order Successful", "success");
      dispatch(clearAllItemsInCart());
      navigate("/");
    } else {
      setGlobalBanner("Order Failed", "failed");
      alert("Order Failed");
    }

    setIsProcesingPayment(false);
  }

  return (
    <PaymentFormContainer onSubmit={paymentHandler}>
      <FormContainer>
        <h2>Contact Info: </h2>
        <LinkAuthenticationElement
          options={{
            defaultValues: {
              email: currentUser ? currentUser.email : "",
            },
          }}
        />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US"],
            defaultValues: {
              name: currentUser ? currentUser.displayName : "",
            },
          }}
        />

        <h3>Credit Card Payment: </h3>
        <PaymentElement />
        <PaymentButtons>
          <CheckoutButton
            buttonType={BUTTON_TYPE_CLASSES.base}
            onClick={goToCheckout}
          >
            Back to Checkout
          </CheckoutButton>
          <PaymentButton
            isDisabled={!stripe}
            isLoading={isProcesingPayment}
            buttonType={BUTTON_TYPE_CLASSES.inverted}
          >
            Pay ${amount}.00
          </PaymentButton>
        </PaymentButtons>
      </FormContainer>
    </PaymentFormContainer>
  );
}

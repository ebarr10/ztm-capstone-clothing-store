import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();

  function goToPayment() {
    navigate("/payment");
  }

  return (
    <CheckoutContainer>
      {cartTotal > 0 ? (
        <>
          <CheckoutHeader>
            <HeaderBlock>
              <span>Product</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Description</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Quantity</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Price</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Remove</span>
            </HeaderBlock>
          </CheckoutHeader>
          {cartItems.map((cartItem) => {
            return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
          })}
          <Total>Total: ${cartTotal}</Total>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={goToPayment}
          >
            Go To Payment
          </Button>
        </>
      ) : (
        <h2>Cart is Empty</h2>
      )}
    </CheckoutContainer>
  );
}

export default Checkout;

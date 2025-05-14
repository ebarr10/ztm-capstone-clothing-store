import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { checkUserSession } from "./store/user/user.action";
import { Spinner } from "./components/spinner/spinner.component";
import { GlobalStyle } from "./global.styles";

// React will not render until it actually fetches this (going to this page) --> reduces the bundle.js size due to code splitting and dynamic imports
// Went from 854 kB --> 302 B
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("../src/routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Payment = lazy(() => import("./routes/payment/payment.component"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  });

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

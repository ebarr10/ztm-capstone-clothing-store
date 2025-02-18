import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
import { GlobalBannerContext } from "../../utils/global-banner/global-banner.utils";

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;

  const { setGlobalBanner } = useContext(GlobalBannerContext);

  function addProductToCart() {
    dispatch(addItemToCart(cartItems, product));
    setGlobalBanner("Added Item to Cart", "info");
  }

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
}

export default ProductCard;

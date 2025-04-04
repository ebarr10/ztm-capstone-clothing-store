import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles";
import { CartItem } from "../../store/cart/cart.types";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(
  ({ cartItem }: CheckoutItemProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity } = cartItem;

    function clearItemHandler() {
      dispatch(clearItemFromCart(cartItems, cartItem));
    }

    function addItemHandler() {
      dispatch(addItemToCart(cartItems, cartItem));
    }

    function removeItemHandler() {
      dispatch(removeItemFromCart(cartItems, cartItem));
    }

    return (
      <CheckoutItemContainer>
        <ImageContainer>
          <img src={imageUrl} alt={`${name}`} />
        </ImageContainer>
        <BaseSpan>{name}</BaseSpan>
        <Quantity>
          <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
          <Value>{quantity}</Value>
          <Arrow onClick={addItemHandler}>&#10095;</Arrow>
        </Quantity>
        <BaseSpan>{price}</BaseSpan>
        <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
      </CheckoutItemContainer>
    );
  }
);

export default CheckoutItem;

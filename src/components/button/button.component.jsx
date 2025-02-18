import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

function getButton(buttonType = BUTTON_TYPE_CLASSES.base) {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
}

function Button({
  children,
  buttonType,
  isLoading,
  isDisabled,
  ...otherProps
}) {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading || isDisabled} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
}

export default Button;

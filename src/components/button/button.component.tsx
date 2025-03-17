import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";
import { FC, ButtonHTMLAttributes } from "react";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
}

const getButton = (
  buttonType = BUTTON_TYPE_CLASSES.base
): typeof BaseButton => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
  isDisabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  isDisabled,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading || isDisabled} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;

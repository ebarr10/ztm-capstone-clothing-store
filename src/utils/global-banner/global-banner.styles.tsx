import styled, { keyframes } from "styled-components";

const slideInOut = keyframes`
  0% {
    transform: translateY(-100%); /* Start from above the screen */
    opacity: 0; /* Start fully transparent */
  }
  10% {
    transform: translateY(0); /* Slide in to the normal position */
    opacity: 1; /* Become fully visible */
  }
  90% {
    transform: translateY(0); /* Keep the position for the remaining duration */
    opacity: 1; /* Stay fully visible */
  }
  100% {
    transform: translateY(-100%); /* Slide out above the screen */
    opacity: 0; /* Fade out */
  }
`;

export const InfoBanner = styled.div`
  display: flex;
  position: fixed;
  top: 5px;
  left: 0;
  right: 0;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  box-shadow: 2px 4px 6px 0px #25170e;
  text-shadow: 1px 1px 1px #888;
  border-radius: 10px;
  background: rgb(24, 155, 255);
  animation: ${slideInOut} 2.8s ease-in-out forwards;

  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;

export const SuccessBanner = styled(InfoBanner)`
  background: rgb(24, 255, 36);
`;

export const FailedBanner = styled(InfoBanner)`
  background: rgb(255, 24, 24);
`;

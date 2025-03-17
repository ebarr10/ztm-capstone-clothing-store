import React, { createContext, ReactNode, useEffect, useState } from "react";
import {
  InfoBanner,
  FailedBanner,
  SuccessBanner,
} from "./global-banner.styles";

export const GlobalBannerContext = createContext({});

type GlobalBannerProviderProps = {
  children: ReactNode;
};

export const GlobalBannerProvider = React.memo(
  ({ children }: GlobalBannerProviderProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [bannerText, setBannerText] = useState("");
    const [bannerType, setBannerType] = useState("");

    function setGlobalBanner(text: string, type: string) {
      setBannerText(text);
      setBannerType(type);
      setIsVisible(true);
    }

    useEffect(() => {
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }, [isVisible]);

    function getBannerType() {
      if (!isVisible) return;

      switch (bannerType) {
        case "failed":
          return <FailedBanner>{bannerText}</FailedBanner>;
        case "success":
          return <SuccessBanner>{bannerText}</SuccessBanner>;
        case "info":
          return <InfoBanner>{bannerText}</InfoBanner>;
        default:
          return <></>;
      }
    }

    const value = { setGlobalBanner };

    return (
      <GlobalBannerContext.Provider value={value}>
        {getBannerType()}
        {children}
      </GlobalBannerContext.Provider>
    );
  }
);

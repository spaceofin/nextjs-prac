"use client";

import Script from "next/script";

export default function ClickButton() {
  return (
    <>
      <Script
        src="/scripts/click-button.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.createButton) {
            window.createButton();
          } else {
            console.warn("createButton is not defined.");
          }
        }}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

const PUBLISHER_ID = "ca-pub-1375355661820080";

export default function AdBanner({
  slot = "1234567890",
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log("AdSense error:", err);
    }

    // Check if ad loaded and has content
    const timer = setTimeout(() => {
      const adContainer = document.querySelector(`[data-ad-slot="${slot}"]`);
      if (adContainer && adContainer.innerHTML && adContainer.innerHTML.includes("iframe")) {
        setShowAd(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [slot]);

  // Don't render anything if ad didn't load
  if (!showAd) return null;

  return (
    <div className={`w-full py-2 ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

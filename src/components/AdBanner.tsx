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
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdLoaded(true);
    } catch (err) {
      console.log("AdSense not loaded yet");
    }

    // Hide ad container if no ad appears after 2 seconds
    const timer = setTimeout(() => {
      const adContainer = document.querySelector(`[data-ad-slot="${slot}"]`);
      if (adContainer && !adContainer.innerHTML.trim()) {
        const wrapper = adContainer.closest("div");
        if (wrapper) wrapper.style.display = "none";
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [slot]);

  if (!adLoaded) return null;

  return (
    <div className={`w-full ${className}`}>
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

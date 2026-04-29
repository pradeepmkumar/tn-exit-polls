"use client";

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

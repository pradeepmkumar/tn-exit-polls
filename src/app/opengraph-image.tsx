import { ImageResponse } from "next/og";
import { ELECTION, POLL_RESULTS, getAverageSeats, ALLIANCES } from "@/lib/data";

export const runtime = "edge";
export const alt = "Tamil Nadu Exit Poll 2026 — Live Tracker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const avg = getAverageSeats();
  const indiaSeat = ["DMK", "INC", "VCK"].reduce((s, p) => s + (avg[p] ?? 0), 0);
  const aiadmkSeat = ["AIADMK", "BJP", "PMK"].reduce((s, p) => s + (avg[p] ?? 0), 0);
  const otherSeat = avg["OTH"] ?? 0;
  const total = ELECTION.totalSeats;

  const indiaW = Math.round((indiaSeat / total) * 100);
  const aiadmkW = Math.round((aiadmkSeat / total) * 100);
  const othersW = 100 - indiaW - aiadmkW;

  const pollCount = POLL_RESULTS.length;
  const latestDate = POLL_RESULTS.sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )[0]?.publishedDate;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 40%, #ea580c 100%)",
          fontFamily: "sans-serif",
          padding: "48px",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 32 }}>
          <div style={{ fontSize: 18, color: "#fca5a5", fontWeight: 600, marginBottom: 8 }}>
            LIVE EXIT POLL TRACKER
          </div>
          <div style={{ fontSize: 48, color: "#ffffff", fontWeight: 800, lineHeight: 1.1 }}>
            Tamil Nadu Assembly
          </div>
          <div style={{ fontSize: 48, color: "#fef2f2", fontWeight: 800, lineHeight: 1.1 }}>
            Election 2026
          </div>
        </div>

        {/* Seat summary cards */}
        <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <div style={{ fontSize: 16, color: "#fca5a5", fontWeight: 600, marginBottom: 4 }}>
              INDIA Alliance
            </div>
            <div style={{ fontSize: 56, color: "#ffffff", fontWeight: 800 }}>{indiaSeat}</div>
            <div style={{ fontSize: 13, color: "#fecaca" }}>DMK + INC + VCK</div>
            {indiaSeat >= 118 && (
              <div
                style={{
                  marginTop: 8,
                  background: "#16a34a",
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: 700,
                  width: "fit-content",
                }}
              >
                MAJORITY ✓
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 8px",
            }}
          >
            <div style={{ fontSize: 14, color: "#fca5a5", fontWeight: 600 }}>Majority</div>
            <div style={{ fontSize: 28, color: "#ffffff", fontWeight: 800 }}>118</div>
            <div style={{ fontSize: 12, color: "#fca5a5" }}>of {total}</div>
          </div>

          <div
            style={{
              flex: 1,
              background: "rgba(0,0,0,0.25)",
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: 16, color: "#6ee7b7", fontWeight: 600, marginBottom: 4 }}>
              AIADMK Alliance
            </div>
            <div style={{ fontSize: 56, color: "#ffffff", fontWeight: 800 }}>{aiadmkSeat}</div>
            <div style={{ fontSize: 13, color: "#a7f3d0" }}>AIADMK + BJP + PMK</div>
          </div>
        </div>

        {/* Seat bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", height: 20, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ width: `${indiaW}%`, background: "#ef4444" }} />
            <div style={{ width: `${othersW}%`, background: "#9ca3af" }} />
            <div style={{ width: `${aiadmkW}%`, background: "#16a34a" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: "#fecaca",
            }}
          >
            <span>← INDIA Alliance ({indiaW}%)</span>
            <span>Based on {pollCount} exit polls · {latestDate}</span>
            <span>AIADMK Alliance ({aiadmkW}%) →</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 48,
            fontSize: 14,
            color: "#fca5a5",
          }}
        >
          tnexitpoll.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

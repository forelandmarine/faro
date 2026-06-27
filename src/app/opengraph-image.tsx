import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Faro Creative · Founder-led design and development studio";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1A3640",
          color: "#D6E9E4",
          display: "flex",
          flexDirection: "column",
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#A8CCCA",
          }}
        >
          Faro Creative
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: -2,
                color: "#D6E9E4",
              }}
            >
              Founder-led design and development.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.3,
                color: "#A8CCCA",
              }}
            >
              Websites, brand systems and editorial properties for specialist
              consultancies, wellness studios and independent publishers.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#A8CCCA",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>faro.is</div>
          <div style={{ display: "flex", color: "#4A8C86" }}>
            United Kingdom and Mallorca
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

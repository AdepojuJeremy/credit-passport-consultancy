import { ImageResponse } from "next/og";

export const alt = "CreditPassport Consulting — better decisions, better credit systems.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFBFC",
          color: "#1A202C",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: 28, fontWeight: 700 }}>
          <div style={{ width: 42, height: 42, borderRadius: 999, background: "#0B3B8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 20, height: 20, borderRadius: 999, background: "#FF7A59" }} />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
            <span>CreditPassport</span>
            <span style={{ color: "#6B7885", fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase" }}>Consulting</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ width: 92, height: 5, background: "#0B5FFF" }} />
          <div style={{ maxWidth: 980, fontSize: 82, lineHeight: 0.96, letterSpacing: "-0.055em", fontWeight: 700 }}>
            Better decisions. Better credit systems.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E8ECF0", paddingTop: "24px", fontSize: 20, color: "#6B7885" }}>
          <span>Credit · Risk · Data · AI · Decision Science</span>
          <span style={{ color: "#0B5FFF" }}>Consulting + Research</span>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";
import { personalInfo } from "@/lib/data";

export const runtime = "edge";
export const alt = `${personalInfo.name} — ${personalInfo.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #07111f 0%, #111827 48%, #0f766e 100%)",
          color: "#f8fafc",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              width: "fit-content",
              border: "1px solid rgba(255,255,255,0.24)",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 26,
              color: "#cbd5e1",
              background: "rgba(15,23,42,0.45)",
            }}
          >
            {personalInfo.location}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 92,
                lineHeight: 0.96,
                letterSpacing: 0,
              }}
            >
              {personalInfo.name}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 42,
                color: "#bae6fd",
              }}
            >
              {personalInfo.role} | {personalInfo.specialty}
            </p>
          </div>
          <p
            style={{
              margin: 0,
              maxWidth: 720,
              fontSize: 32,
              lineHeight: 1.25,
              color: "#dbeafe",
            }}
          >
            {personalInfo.tagline}.
          </p>
        </div>
        <div
          style={{
            width: 280,
            height: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 48,
            border: "2px solid rgba(255,255,255,0.28)",
            background: "linear-gradient(135deg, rgba(14,165,233,0.95), rgba(124,58,237,0.92))",
            boxShadow: "0 40px 120px rgba(14,165,233,0.35)",
            fontSize: 104,
            fontWeight: 800,
          }}
        >
          RA
        </div>
      </div>
    ),
    size,
  );
}

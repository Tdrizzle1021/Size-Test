import { useState, useRef, useEffect } from "react";
const brandOffsets = {
  Zara: -1,          // runs small
  "H&M": 0,          // true to size
  Nike: 0,           // true to size
  Lululemon: -1,     // runs tight
  Aritzia: -1,       // runs small
  Uniqlo: 0,         // consistent
  Abercrombie: 1,    // runs large
  Shein: -1,         // runs small
  Everlane: 0,       // true to size
  Madewell: 1,       // runs large
  FreePeople: 1      // runs oversized
};

const brandLogos = {
  Zara: "/logos/zara.png",
  "H&M": "/logos/hm.png",
  Nike: "/logos/nike.png",
  Lululemon: "/logos/lululemon.png",
  Aritzia: "/logos/aritzia.png",
  Uniqlo: "/logos/uniqlo.png",
  Abercrombie: "/logos/abercrombie.png",
  Shein: "/logos/shein.png",
  Everlane: "/logos/everlane.png",
  Madewell: "/logos/madewell.png",
  FreePeople: "/logos/freepeople.png"
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  background: "#fafafa",
  outline: "none",
  marginTop: "6px"
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#333"
};
const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 0.1s ease, box-shadow 0.1s ease",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
};

const resultCardStyle = {
  marginTop: "20px",
  padding: "16px 18px",
  background: "#f8f9fb",
  borderRadius: "14px",
  fontSize: "15px",
  lineHeight: 1.5,
  color: "#111",
  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  border: "1px solid #eee"
};

export default function Home() {
  const [fromBrand, setFromBrand] = useState("");
  const [toBrand, setToBrand] = useState("");
  const [size, setSize] = useState("");
  const [result, setResult] = useState("");
const [showTooltip, setShowTooltip] = useState(false);
const tooltipRef = useRef(null);

  const handleCompare = () => {
    if (!fromBrand || !toBrand || !size) {
      setResult("Please select all options.");
      return;
    }

const sizes = ["XS", "S", "M", "L", "XL"];

const fromIndex = sizes.indexOf(size);
const adjustment =
  (brandOffsets[toBrand] || 0) - (brandOffsets[fromBrand] || 0);

let newIndex = fromIndex + adjustment;

// Clamp to valid range
newIndex = Math.max(0, Math.min(sizes.length - 1, newIndex));

const recommendedSize = sizes[newIndex];

setResult(
  `If you wear a ${size} in ${fromBrand}, you’ll likely be a ${recommendedSize} in ${toBrand}.`
);

  };
useEffect(() => {
  function handleClickOutside(event) {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setShowTooltip(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

return (
  <main
    style={{
      maxWidth: 420,
      margin: "80px auto",
      padding: "28px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 12px 32px rgba(0,0,0,0.08)"
    }}
  >
    <h1 style={{ fontSize: 24, marginBottom: 8 }}>
      Find Your Size Across Brands
    </h1>

    <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
      Sizing varies by brand — we help you predict the right fit.{" "}
      <span
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: 500
        }}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        How we estimate sizing
      </span>
    </p>


{showTooltip && (
  <div
    ref={tooltipRef}
    style={{
      position: "relative",
      background: "#111",
      color: "#fff",
      padding: "10px 12px",
      borderRadius: "8px",
      fontSize: "13px",
      lineHeight: 1.4,
      marginTop: "8px",
      marginBottom: "15px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      maxWidth: "360px"
    }}
  >

<div
  style={{
    position: "absolute",
    top: "-6px",
    left: "24px",
    width: "12px",
    height: "12px",
    background: "#111",
    transform: "rotate(45deg)"
  }}
/>

    We compare how brands typically fit (small, true-to-size, or oversized) and
    adjust your size accordingly. This is an early estimate based on shopper
    feedback — not exact body or garment measurements.
  </div>
)}


<label style={labelStyle}>Current Brand</label>
<select
  style={inputStyle}
  onChange={(e) => setFromBrand(e.target.value)}
>
  <option value="">Select brand</option>
  {Object.keys(brandOffsets).map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ))}
</select>


      <br /><br />

<label style={labelStyle}>Target Brand</label>
<select
  style={inputStyle}
  onChange={(e) => setToBrand(e.target.value)}
>
  <option value="">Select brand</option>
  {Object.keys(brandOffsets).map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ))}
</select>


      <br /><br />

<label style={labelStyle}>Your Usual Size</label>
<select
  style={inputStyle}
  onChange={(e) => setSize(e.target.value)}
>
        <option value="">Select size</option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>

      <br /><br />

     <button
  style={buttonStyle}
  onClick={handleCompare}
  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  Compare Sizes
</button>

{result && (
  <div style={resultCardStyle}>
    {result}
  </div>
)}

    </main>
  );
}

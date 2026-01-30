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
    <main style={{ maxWidth: 400, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h1>Find Your Size Across Brands</h1>

<p>
  Sizing varies by brand — we help you predict the right fit.{" "}
  <span
    style={{ textDecoration: "underline", cursor: "pointer", fontSize: 14 }}
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


    <label>Current Brand</label>
<select onChange={(e) => setFromBrand(e.target.value)}>
  <option value="">Select brand</option>
  {Object.keys(brandOffsets).map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ))}
</select>


      <br /><br />

    <label>Target Brand</label>
<select onChange={(e) => setToBrand(e.target.value)}>
  <option value="">Select brand</option>
  {Object.keys(brandOffsets).map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ))}
</select>


      <br /><br />

      <label>Your Usual Size</label>
      <select onChange={(e) => setSize(e.target.value)}>
        <option value="">Select size</option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>

      <br /><br />

      <button onClick={handleCompare}>
        Compare Sizes
      </button>

      {result && (
        <p style={{ marginTop: 20, fontWeight: "bold" }}>
          {result}
        </p>
      )}
    </main>
  );
}

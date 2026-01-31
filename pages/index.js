import { useState, useRef, useEffect } from "react";
const excludedBrands = []; // future opt-out list
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

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "14px",
  borderRadius: "10px",
  border: "1px solid #e4d7c8",
  background: "#fffaf4",
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
  background: "linear-gradient(135deg, #6b4f3f, #5a4033)",
  color: "#fff",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 0.1s ease, box-shadow 0.15s ease",
  boxShadow: "0 10px 24px rgba(90,64,51,0.35)"
};

const resultCardStyle = {
  marginTop: "20px",
  padding: "16px 18px",
  background: "#faf4ec",
  borderRadius: "14px",
  fontSize: "15px",
  lineHeight: 1.5,
  color: "#111",
  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  border: "1px solid #eee"
};

function BrandSelect({
  label,
  value,
  onChange,
  options,
  id,
  openDropdown,
  setOpenDropdown
}) {
const open = openDropdown === id;
  const ref = useRef(null);

 useEffect(() => {
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpenDropdown(null);
    }
  }
  document.addEventListener("mouseup", handleClickOutside);
return () => document.removeEventListener("mouseup", handleClickOutside);
}, [setOpenDropdown]);

  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>

<button
  type="button"
  onClick={() => setOpenDropdown(open ? null : id)}

        style={{
          ...inputStyle,
          textAlign: "left",
          background: "#fff",
          cursor: "pointer",
          fontWeight: value ? 600 : 400,
          color: value ? "#111" : "#777"
        }}
      >
        {value || "Select brand"}
      </button>

<div
  style={{
    position: "absolute",
    top: "110%",
    width: "100%",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    zIndex: 30,
    maxHeight: open ? 240 : 0,
    overflow: "hidden",
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(-6px)",
    transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: open ? "auto" : "none"
  }}
>
         {options.map((brand) => (
  <div
    key={brand}
   onClick={() => {
  onChange(brand);
  setOpenDropdown(null);
}}
    style={{
      padding: "12px 14px",
      cursor: "pointer",
      borderBottom: "1px solid #f0f0f0"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#f7efe5";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
    }}
  >
    {brand}
  </div>
))}

        </div>
    </div>
  );
}
function SizeSelect({
  label,
  value,
  onChange,
  options,
  id,
  openDropdown,
  setOpenDropdown
}) {
  const open = openDropdown === id;
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [setOpenDropdown]);

  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>

      <button
        type="button"
        onClick={() => setOpenDropdown(open ? null : id)}
        style={{
          ...inputStyle,
          textAlign: "left",
          background: "#fff",
          cursor: "pointer",
          fontWeight: value ? 600 : 400,
          color: value ? "#111" : "#777"
        }}
      >
        {value || "Select size"}
      </button>

      <div
        style={{
          position: "absolute",
          top: "110%",
          width: "100%",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          zIndex: 30,
          maxHeight: open ? 240 : 0,
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: open ? "auto" : "none"
        }}
      >
        {options.map((size) => (
          <div
            key={size}
            onClick={() => {
              onChange(size);
              setOpenDropdown(null);
            }}
            style={{
              padding: "12px 14px",
              cursor: "pointer",
              borderBottom: "1px solid #f0f0f0"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f7efe5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState("tops");
  const [openDropdown, setOpenDropdown] = useState(null);

  const [fromBrand, setFromBrand] = useState("");
  const [toBrand, setToBrand] = useState("");
  const [size, setSize] = useState("");
  const [result, setResult] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const tooltipRef = useRef(null);

  const handleCompare = () => {
    if (!fromBrand || !toBrand || !size) {
      setResult("Please select all options.");
      return;
    }
  if (!acknowledged) {
  setResult("Please acknowledge that this is an estimate before continuing.");
  return;
}

  if (fromBrand === toBrand) {
  setResult("Please select two different brands to compare.");
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
  `Estimated size: Based on general fit patterns, someone who wears a ${size} in ${fromBrand} may prefer a ${recommendedSize} in ${toBrand}.`
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
  <div
    style={{
      minHeight: "100vh",
background:
  "radial-gradient(circle at top, #fdf6ee 0%, #f7efe5 40%, #f1e8dc 100%)",
      padding: "20px"
    }}
  >
    <main
      style={{
        maxWidth: 420,
        margin: "80px auto",
        padding: "28px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#fffdf9",
        borderRadius: "16px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
        position: "relative",
        zIndex: 1
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
<label style={labelStyle}>Category</label>

<div style={{ display: "flex", gap: "10px", marginTop: 6 }}>
  <button
    type="button"
    onClick={() => setCategory("tops")}
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: category === "tops" ? "2px solid #5a4033" : "1px solid #e4d7c8",
      background: category === "tops" ? "#5a4033" : "#fffaf4",
      color: category === "tops" ? "#fff" : "#5a4033",
      fontWeight: 600,
      cursor: "pointer"
    }}
  >
    Tops
  </button>

  <button
    type="button"
    disabled
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: "1px dashed #ccc",
      background: "#f5f5f5",
      color: "#999",
      fontWeight: 600,
      cursor: "not-allowed"
    }}
  >
    Bottoms (Coming soon)
  </button>
</div>

<br />


{showTooltip && (
  <div
    ref={tooltipRef}
    style={{
      position: "relative",
      background: "#5a4033",
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
    background: "#5a4033",
    transform: "rotate(45deg)"
  }}
/>
    <strong>How we estimate sizing</strong>
<br /><br />
Size recommendations shown here are <strong>informational estimates only</strong>,
based on general fit trends reported by shoppers and publicly observed brand
patterns.
<br /><br />
Actual fit may vary depending on garment style, fabric, body shape, and personal
preference. This tool does <strong>not</strong> guarantee fit.
<br /><br />
Brand names are used for identification purposes only and do not imply
endorsement or affiliation.

  </div>
)}

<BrandSelect
  id="fromBrand"
  label="Current Brand"
  value={fromBrand}
  onChange={setFromBrand}
  options={Object.keys(brandOffsets).filter(
  (brand) => !excludedBrands.includes(brand)
)}
  openDropdown={openDropdown}
  setOpenDropdown={setOpenDropdown}
/>

<BrandSelect
  id="toBrand"
  label="Target Brand"
  value={toBrand}
  onChange={setToBrand}
  options={Object.keys(brandOffsets).filter(
  (brand) => !excludedBrands.includes(brand)
)}
  openDropdown={openDropdown}
  setOpenDropdown={setOpenDropdown}
/>

<SizeSelect
  id="size"
  label="Your Usual Size"
  value={size}
  onChange={setSize}
  options={["XS", "S", "M", "L", "XL"]}
  openDropdown={openDropdown}
  setOpenDropdown={setOpenDropdown}
/>

      <br /><br />
<div style={{ marginTop: 14, fontSize: 13 }}>
  <label style={{ display: "flex", gap: 8, cursor: "pointer" }}>
    <input
      type="checkbox"
      checked={acknowledged}
      onChange={(e) => setAcknowledged(e.target.checked)}
    />
    <span>
      I understand this size recommendation is an estimate, not a guarantee.
    </span>
  </label>
</div>
     <button
  style={buttonStyle}
  onClick={handleCompare}
  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  Compare Sizes
</button>
<p style={{ fontSize: 12, color: "#777", marginTop: 10 }}>
  Results are generated in real time and are not stored.
</p>
    {result && (
      <div style={resultCardStyle}>
        {result}
      </div>
    )}

    </main>
  </div>
);
}

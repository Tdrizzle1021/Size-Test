import { useState } from "react";
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

  return (
    <main style={{ maxWidth: 400, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h1>Find Your Size Across Brands</h1>
      <p>Sizing varies by brand — we help you predict the right fit.</p>

      <label>Current Brand</label>
      <select onChange={(e) => setFromBrand(e.target.value)}>
        <option value="">Select brand</option>
        <option>Zara</option>
        <option>H&M</option>
        <option>Nike</option>
        <option>Lululemon</option>
      </select>

      <br /><br />

      <label>Target Brand</label>
      <select onChange={(e) => setToBrand(e.target.value)}>
        <option value="">Select brand</option>
        <option>Zara</option>
        <option>H&M</option>
        <option>Nike</option>
        <option>Lululemon</option>
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

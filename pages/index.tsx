export default function Home() {
  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <h1>Find Your Size Across Brands</h1>

      <p>
        Women’s clothing sizes aren’t consistent. This early tool compares brands
        to a median size standard so you know when to size up or down.
      </p>

      <p style={{ color: "orange" }}>
        ⚠️ Early test version — results are directional, not definitive.
      </p>

      <label>Bust measurement (inches)</label>
      <input
        type="number"
        placeholder="e.g. 36"
        style={{ width: "100%", marginBottom: 12 }}
      />

      <p>Select a brand</p>
      {["Zara", "Aritzia", "Madewell", "Everlane", "Universal Standard"].map(
        (brand) => (
          <button key={brand} style={{ display: "block", marginBottom: 6 }}>
            {brand}
          </button>
        )
      )}

      <hr />

      <h2>Recommended: M</h2>
      <p>True to Median</p>
      <p>Confidence: High</p>

      <p style={{ marginTop: 24 }}>
        We’d love your feedback. What was confusing? What felt useful? Would you
        use this before buying online?
      </p>
    </main>
  );
}

export function TrustBar() {
  const logos = [
    "NORTHPEAK",
    "VERTIX LABS",
    "BRIGHTLINE",
    "FINTRA",
    "MERIDIAN",
    "AXIOM CO.",
    "CRESTFIELD",
    "LUMINATE",
  ];

  // Duplicate for seamless loop
  const track = [...logos, ...logos];

  return (
    <section style={{ padding: "40px 28px 80px" }}>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 12px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            fontWeight: 700,
            opacity: 0.5,
            marginBottom: 16,
          }}
        >
          Trusted by 500+ companies, from fast-growing startups to enterprise
          teams
        </div>
        <div className="uw-marquee">
          <div className="uw-track uw-track-l">
            {track.map((name, i) => (
              <div key={`${name}-${i}`} className="uw-logo">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

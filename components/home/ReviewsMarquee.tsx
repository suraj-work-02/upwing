// Pravatar.cc - real human photos, free, no API key, pinned by ?img=ID (1–70)
const candidateReviews = [
  {
    name: "J. Martinez",
    role: "Placed as Data Analyst",
    quote:
      "Three interviews and an offer inside a month. My advisor prepped me for every one of them.",
    bg: "#f7c9c2",
    avatarColor: "#ee2299",
    avatarImg: 5, // professional latina woman
  },
  {
    name: "R. Okafor",
    role: "Placed as Product Designer",
    quote:
      "The coaching alone was worth it, resume, portfolio, mock interviews, all of it.",
    bg: "#f9dfae",
    avatarColor: "#ee9922",
    avatarImg: 15, // professional young man
  },
  {
    name: "S. Nguyen",
    role: "Placed as Financial Analyst",
    quote:
      "Felt like I had a career partner, not a recruiter chasing a commission.",
    bg: "#dcd6f7",
    avatarColor: "#9922ee",
    avatarImg: 44, // professional asian woman
  },
  {
    name: "A. Patel",
    role: "Placed as Software Engineer",
    quote:
      "Within two weeks I had three offers on the table. UpWing made it happen.",
    bg: "#c9e9d3",
    avatarColor: "#22bb77",
    avatarImg: 33, // professional south asian man
  },
];

const companyReviews = [
  {
    name: "Head of Talent",
    role: "Series B SaaS company",
    quote:
      "UpWing sent us a shortlist we could actually decide from, no wading through 40 resumes.",
    bg: "#fff",
    avatarColor: "#3b82f6",
    avatarImg: 11, // professional executive woman
  },
  {
    name: "VP Operations",
    role: "Regional healthcare group",
    quote:
      "We scaled a whole department with contract staff in under three weeks.",
    bg: "#fff",
    avatarColor: "#6366f1",
    avatarImg: 68, // professional executive man
  },
  {
    name: "Founder",
    role: "Early-stage fintech startup",
    quote:
      "Our first two engineering hires both came through UpWing. Both still with us.",
    bg: "#fff",
    avatarColor: "#f59e0b",
    avatarImg: 57, // startup founder type
  },
  {
    name: "Director of HR",
    role: "Mid-market manufacturing firm",
    quote:
      "They understood our culture fit requirements immediately. First match was the right match.",
    bg: "#fff",
    avatarColor: "#10b981",
    avatarImg: 26, // professional HR director woman
  },
];

type Review = {
  name: string;
  role: string;
  quote: string;
  bg: string;
  avatarColor: string;
  avatarImg: number;
};

function ReviewCard({ review }: { review: Review }) {
  // Pravatar.cc: real photo faces, CC0 licensed, no API key required
  // ?img=N pins to a specific person (1–70) so the avatar is always consistent
  const avatarUrl = `https://i.pravatar.cc/96?img=${review.avatarImg}`;

  return (
    <div className="uw-review" style={{ background: review.bg }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            padding: 2.5,
            background: `linear-gradient(135deg, ${review.avatarColor}, ${review.avatarColor}88)`,
            flexShrink: 0,
            boxShadow: `0 4px 14px ${review.avatarColor}44`,
          }}
        >
          <img
            src={avatarUrl}
            alt={`${review.name} photo`}
            width={45}
            height={45}
            style={{
              borderRadius: "50%",
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "2px solid #fff",
            }}
          />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{review.name}</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>{review.role}</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 14, opacity: 0.8, lineHeight: 1.5 }}>
        &ldquo;{review.quote}&rdquo;
      </p>
    </div>
  );
}

export function ReviewsMarquee() {
  const row1 = [...candidateReviews, ...candidateReviews];
  const row2 = [...companyReviews, ...companyReviews];

  return (
    <section className="reviews-section" style={{ padding: "100px 28px 80px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#ff6b57",
            marginBottom: 6,
          }}
        >
          Real Outcomes
        </div>
        <h2
          style={{
            fontSize: "clamp(22px, 2.5vw, 30px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            maxWidth: 560,
            margin: "0 0 26px",
          }}
        >
          Candidates placed. Companies staffed.
        </h2>

        {/* Row 1 - scrolls left */}
        <div className="uw-marquee" style={{ marginBottom: 16 }}>
          <div className="uw-track uw-track-l-slow">
            {row1.map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls right */}
        <div className="uw-marquee">
          <div className="uw-track uw-track-r-slow">
            {row2.map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

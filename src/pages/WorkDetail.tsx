
import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { workItems } from "../data/work";
import type { WorkItem } from "../data/work";
import Navbar from "../components/Navbar";

const RECURRENCY_PASSWORD = "antonia2026"; // TODO: Move to env variable

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const item: WorkItem | undefined = workItems.find((w) => w.slug === slug);
  if (!item) return <Navigate to="/" replace />;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll-triggered fade-in for sections
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    const elements = contentRef.current.querySelectorAll(".case-study-section, .workflow-sketches");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === RECURRENCY_PASSWORD) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Check if this is Recurrency and requires password
  const requiresPassword = item.slug === "recurrency";
  const showCaseStudy = !requiresPassword || isUnlocked;

  return (
    <>
      <Navbar />

      <div className="work-detail-container">
        {/* Header with icon and title inline - in glass container */}
        <div className="case-study-header-container">
          <div className="case-study-header">
            {item.icon && (
              <img
                className="case-study-icon"
                src={item.icon}
                alt={`${item.title} icon`}
              />
            )}
            <div className="case-study-title-block">
              <div className="case-study-title-row">
                <span className="case-study-title">{item.title}</span>
                <span className="case-study-role">{item.role}</span>
                <span className="case-study-year">{item.year}</span>
              </div>
              {item.orgLine && <div className="case-study-org">{item.orgLine}</div>}
            </div>
          </div>
        </div>

        {/* Title and description - outside glass container */}
        <div className="case-study-intro">
          <h1 className="case-study-main-title">Daily Workflow</h1>
          <p className="case-study-description-line">
            Guided prioritization for time-sensitive inventory decisions
          </p>
          <p className="case-study-description-blurb">
            At Recurrency, customers receive hundreds of replenishment recommendations across items and locations. As a product design intern, I worked on designing a daily workflow that prioritizes time-sensitive and high-risk items — so users can confidently decide where to start, without being overwhelmed by volume.
          </p>
        </div>

        {/* Public metadata - outside glass container */}
        <div className="case-study-meta-grid">
          <div className="case-study-meta-item">
            <div className="case-study-meta-label">ROLE</div>
            <div className="case-study-meta-value">Product Designer</div>
          </div>
          <div className="case-study-meta-item">
            <div className="case-study-meta-label">DURATION</div>
            <div className="case-study-meta-value">
              12 Weeks — released September 2025
            </div>
          </div>
          {item.team && (
            <div className="case-study-meta-item">
              <div className="case-study-meta-label">TEAM</div>
              <div className="case-study-meta-value">{item.team}</div>
            </div>
          )}
          {item.tools && (
            <div className="case-study-meta-item">
              <div className="case-study-meta-label">TOOLS</div>
              <div className="case-study-meta-value">{item.tools}</div>
            </div>
          )}
        </div>

        {/* Password gate or case study content */}
        {requiresPassword && !isUnlocked ? (
          <div className="password-gate">
            <form onSubmit={handleUnlock} className="password-form">
              <h2 className="password-title">UNLOCK CASE STUDY</h2>
              <p className="password-description">
                If you don't have access and have questions, please reach out to me at ac5186@columbia.edu!
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="password-input"
              />
              {error && <p className="password-error">{error}</p>}
              <button type="submit" className="password-submit">
                Unlock
              </button>
            </form>
          </div>
        ) : (
          showCaseStudy && (
            <div className="case-study-content" ref={contentRef}>
              {/* Context Section */}
              <section className="case-study-section">
                <h3 className="section-label">CONTEXT</h3>
                <p className="section-text">
                  The existing Planning table gave users full visibility into recommendations, but required manual filtering and interpretation to determine what needed attention today.
                </p>
                <div className="workflow-sketches">
                  <img
                    src="/work/rec_context.png"
                    alt="Recurrency context"
                    className="workflow-image"
                  />
                </div>
              </section>

              {/* Challenge Section */}
              <section className="case-study-section">
                <h3 className="section-label">THE CHALLENGE</h3>
                <p className="section-text challenge-statement">
                  Introducing focus without removing control: giving users an intuitive entry point preserving transparency and trust in the system.
                </p>
                <p className="section-text">
                  Research and conversations with planners, Customer Success, and Solutions teams uncovered an important distinction: users could disagree with a recommendation and still need to review it urgently.
                </p>
                <div className="workflow-sketches">
                  <img
                    src="/work/rec_challenge.png"
                    alt="Recurrency challenge"
                    className="workflow-image"
                    style={{ width: "100%" }}
                  />
                </div>
                <p className="section-text">
                  Existing workflows assumed that review priority should reflect agreement. In practice, planners needed a way to surface items based on risk, timing, and business impact, regardless of whether they ultimately accepted or overrode the recommendation.
                </p>
              </section>

              {/* Solutions Section */}
              <section className="case-study-section">
                <h3 className="section-label">SOLUTIONS</h3>
                <p className="section-text solution-statement">
                  A daily workflow designed to help planners confidently prioritize time-sensitive inventory decisions focusing on what to review, and, most importantly, why.
                </p>

                {/* Workflow sketches */}
                <div className="workflow-sketches">
                  <img
                    src="/work/rec_case_1.png"
                    alt="Daily workflow overview"
                    className="workflow-image"
                  />
                </div>
              </section>

              {/* Feature Set */}
              <section className="case-study-section">
                <h3 className="section-label">FEATURE SET</h3>
                <h3 className="feature-title">Deliberate, item-by-item actions</h3>
                <p className="section-text">
                  Bulk actions were intentionally excluded. Each surfaced item is meant to be reviewed individually, reinforcing trust and preventing over-automation of critical items.
                </p>
                <div className="workflow-sketches">
                  <img
                    src="/work/rec_feature_1.png"
                    alt="Deliberate item-by-item actions"
                    className="workflow-image"
                  />
                </div>
              </section>

              <section className="case-study-section feature-section">
                <h3 className="feature-title">Focused daily queue with rule-driven prioritization</h3>
                <p className="section-text">
                  Instead of scanning the full Planning table, users start their day with a short, curated list. The idea was to emphasize momentum and completion, helping teams build a consistent review habit.
                </p>
                <div className="workflow-sketches">
                  <img
                    src="/work/rec_feature_2.png"
                    alt="Focused daily queue"
                    className="workflow-image"
                    style={{ width: "80%" }}
                  />
                </div>
                <p className="section-text">
                  Daily Workflow is powered by a small set of configurable validation rules. Those rules encode each customer's operational priorities, surfacing only inventory items that are both relevant to their business, urgent, and actionable.
                </p>
              </section>

              <section className="case-study-section feature-section">
                <h3 className="feature-title">Context-rich item review with AI-powered gut check</h3>
                <p className="section-text">
                  Each item includes key data and a plain-language explanation for why it appears, reducing the need to cross-reference multiple views or panels.
                </p>
                <div className="workflow-sketches">
                  <img
                    src="/work/rec_feature_3.png"
                    alt="AI-powered gut check"
                    className="workflow-image"
                  />
                </div>
              </section>

              <section className="case-study-section feature-section">
                <h3 className="feature-title">Path to gradual automation</h3>
                <p className="section-text">
                  Repeated unmodified acceptances can be flagged for optional automation, allowing routine decisions to be delegated while keeping users in control of the underlying logic.
                </p>
              </section>

              {/* The Full Picture */}
              <section className="case-study-section">
                <h3 className="section-label">THE FULL PICTURE</h3>
                <div className="workflow-sketches">
                  <img
                    src="/work/rec_full.png"
                    alt="The full picture"
                    className="workflow-image"
                  />
                </div>
              </section>

              {/* Learnings + Outcomes */}
              <section className="case-study-section">
                <h3 className="section-label">LEARNINGS + OUTCOMES</h3>
                <p className="section-text">
                  The Daily Workflow drove an increase in the number of items reviewed after launch. The workflow was introduced to tenants in September 2025. While I can't share specific details, here is what I learned from the experience:
                </p>
                <div className="learning-item">
                  <span className="learning-number">1.</span>
                  <p className="section-text">
                    <strong>Allow yourself to zoom in.</strong> It is difficult to see the full picture of an enterprise product from diagrams alone. I initially thought the challenge was prioritization logic; I then realized, in practice, that the friction was in small, cumulative moments. Zooming in on those micro-interactions, where the eye moved first, watching the hesitation, asking more questions, reshaped the solution and allowed me to visualize the full picture.
                  </p>
                </div>
                <div className="learning-item">
                  <span className="learning-number">2.</span>
                  <p className="section-text">
                    <strong>Balancing ownership with collaboration.</strong> As my first experience working on a live product, I had to find the balance between owning decisions independently and actively seeking input from the team. At the beginning, I tried to resolve questions on my own before sharing work. I now can see how the best iterations of the workflow happened in moments of collaboration, especially when decisions intersected with engineering constraints and operational nuances.
                  </p>
                </div>
              </section>

              <div style={{ marginTop: 64, textAlign: "center" }}>
                <Link to="/" className="back-arrow-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </Link>
              </div>
            </div>
          )
        )}

        <footer className="footer">
          Antonia Casariego Oronoz — work in progress!
        </footer>
      </div>
    </>
  );
}

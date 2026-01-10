
import { useParams, Navigate, Link } from "react-router-dom";
import { workItems } from "../data/work";
import type { WorkItem } from "../data/work";
import Navbar from "../components/Navbar";

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();

  const item: WorkItem | undefined = workItems.find((w) => w.slug === slug);
  if (!item) return <Navigate to="/" replace />;

  const rightVariant =
    item.rightVariant ?? (item.previews?.[0] ? "single" : undefined);

  const hasCollage =
    rightVariant === "collage" &&
    (item.collageTop?.length || item.collageBottom?.length);

  const hasSingle = rightVariant === "single" && !!item.previews?.[0];
  const hasRight = hasCollage || hasSingle;

  return (
    <>
      {/* Top navigation */}
      <Navbar />

      <div className={["fg-card", !hasRight ? "fg-card--noRight" : ""].join(" ")}>
        <div className="fg-left">
          <div className="fg-header">
            {item.icon ? (
              <img
                className="fg-icon"
                src={item.icon}
                alt={`${item.title} icon`}
              />
            ) : null}

            <div className="fg-titleBlock">
              <div className="fg-titleRow">
                <span className="fg-title">{item.title}</span>
                <span className="fg-role">{item.role}</span>
                <span className="fg-year">{item.year}</span>
              </div>

              {item.orgLine ? (
                <div className="fg-orgLine">{item.orgLine}</div>
              ) : null}
            </div>
          </div>

          <p className="fg-blurb">{item.oneLiner}</p>

          {item.team || item.tools ? (
            <div className="fg-metaRow">
              {item.team ? (
                <div className="fg-metaBlock">
                  <div className="fg-metaLabel">TEAM</div>
                  <div className="fg-metaValue">{item.team}</div>
                </div>
              ) : null}

              {item.tools ? (
                <div className="fg-metaBlock">
                  <div className="fg-metaLabel">TOOLS</div>
                  <div className="fg-metaValue">{item.tools}</div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div style={{ marginTop: 18 }}>
            <Link to="/" style={{ color: "inherit" }}>
              ← back
            </Link>
          </div>
        </div>

        {hasRight ? (
          <div className="fg-right">
            <div className="fg-shotWrap">
              {hasCollage ? (
                <div className="fg-collage">
                  <div className="fg-collageTop">
                    {(item.collageTop ?? []).slice(0, 3).map((src, i) => (
                      <img
                        key={src}
                        className="fg-sketch"
                        src={src}
                        alt={`${item.title} sketch ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div
                    className={[
                      "fg-collageBottom",
                      (item.collageBottom?.length ?? 0) === 1
                        ? "fg-collageBottom--single"
                        : "",
                    ].join(" ")}
                  >
                    {(item.collageBottom ?? []).slice(0, 3).map((src, i) => (
                      <img
                        key={src}
                        className="fg-phone"
                        src={src}
                        alt={`${item.title} prototype ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  className="fg-shot"
                  src={item.previews![0]}
                  alt={`${item.title} preview`}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

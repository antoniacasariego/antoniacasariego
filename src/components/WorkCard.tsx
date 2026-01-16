import { Link } from "react-router-dom";
import type { WorkItem } from "../data/work";

type Props = {
  item: WorkItem;
};

export default function WorkCard({ item }: Props) {
  const rightVariant = item.rightVariant ?? "single";

  const hasSingle = Boolean(item.previews?.[0]);
  const hasCollage =
    rightVariant === "collage" &&
    Boolean(item.collageTop?.length || item.collageBottom?.length);

  const hasRight = hasSingle || hasCollage;

  // Only enable Recurrency for now
  const disabled = item.slug !== "recurrency";

  const stopNav = (e: React.SyntheticEvent) => {
    if (!disabled) return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      to={`/work/${item.slug}`}
      className={`fg-card ${!hasRight ? "fg-card--noRight" : ""}`}
      onClick={stopNav}
      onKeyDown={(e) => {
        if (!disabled) return;
        if (e.key === "Enter" || e.key === " ") stopNav(e);
      }}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {/* LEFT */}
      <div className="fg-left">
        <div className="fg-header">
          {item.icon ? (
            <img className="fg-icon" src={item.icon} alt={`${item.title} icon`} />
          ) : null}

          <div className="fg-titleBlock">
            <div className="fg-titleRow">
              <span className="fg-title">{item.title}</span>
              <span className="fg-role">{item.role}</span>
              <span className="fg-year">{item.year}</span>
            </div>

            {item.orgLine ? <div className="fg-orgLine">{item.orgLine}</div> : null}
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
      </div>

      {/* RIGHT */}
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

                <div className="fg-collageBottom">
                  {(item.collageBottom ?? []).slice(0, 3).map((src, i) => (
                    <img
                      key={src}
                      className={(item.collageBottom?.length ?? 0) === 1 ? "fg-phoneBig" : "fg-phone"}
                      src={src}
                      alt={`${item.title} prototype ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <img className="fg-shot" src={item.previews![0]} alt={`${item.title} preview`} />
            )}
          </div>
        </div>
      ) : null}
    </Link>
  );
}

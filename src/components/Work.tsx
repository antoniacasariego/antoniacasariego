// src/components/Work.tsx (or wherever it lives)
import { workItems } from "../data/work";
import WorkCard from "../components/WorkCard";

export default function Work() {
  return (
    <section className="section work-section">
      <div className="container">
        <h2 className="work-heading">work</h2>

        <div className="work-list">
          {workItems.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

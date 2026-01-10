export type WorkItem = {
  slug: string;
  title: string;
  role: string;
  year: string;
  orgLine?: string;
  icon?: string;
  oneLiner: string;
  team?: string;
  tools?: string;
  previews?: string[];

  // NEW:
  rightVariant?: "single" | "collage";
  collageTop?: string[];     // 3 sketch images
  collageBottom?: string[];  // 3 phone/prototype images
};


export const workItems: WorkItem[] = [
  {
    slug: "recurrency",
    title: "Recurrency",
    role: "Product Design Intern",
    year: "2025",
    orgLine: "at Engineering, Product, and Design Department",
    icon: "/work/recurrency-icon.png",
    oneLiner: "Redesigned Recurrency’s core demand-planning workflow: audited existing flows and user behavior to highlight friction points and improve task prioritization, consistency of user completion, and overall user productivity.",
    team: "3 Software Engineers, Product Manager",
    tools: "FigJam, Figma, Miro, Mixpanel, FullStory",
    previews: ["/work/rec-1.png"],
    rightVariant: "single",
  },
  {
    slug: "innovation-and-design-lab",
    title: "Innovation and Design Lab",
    role: "Columbia University",
    year: "2025",
    orgLine: "with Professor Gary Zamchick",
    icon: "/work/innovation-icon.png",
    oneLiner: "Generated and iterated on product concepts through sketching and rapid prototyping, using visual thinking to reason about user behavior and clarify direction under ambiguity.",
    tools: "FigJam, Figma, Balsamiq, Procreate",
    rightVariant: "collage",
    collageTop: [
      "/work/innov-1.png",
      "/work/innov-2.png",
      "/work/innov-3.png",
    ],
    collageBottom: [
      "/work/innov-4.png",
    ],
  },
  {
    slug: "columbia-build-lab",
    title: "Columbia Build Lab",
    role: "Product Design Intern",
    year: "2024",
    orgLine: "at Columbia Business School",
    oneLiner:
      "Selected to partner with an early-stage startup to design an MVP from concept to prototype, winning 1st place at Columbia’s Tech Venture Showcase.",
    icon: "/work/buildlab-icon.png",
  },
];
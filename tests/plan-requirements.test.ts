import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";

import nextConfig from "../next.config";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { hero } from "../data/hero";
import { proficiency } from "../data/proficiency";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { socialLinks } from "../data/social";
import { testimonials } from "../data/testimonials";

describe("Plan.md portfolio requirements", () => {
  it("uses static export settings required by Next.js deployment", () => {
    expect(nextConfig.output).toBe("export");
    expect(nextConfig.trailingSlash).toBe(true);
    expect(nextConfig.images?.unoptimized).toBe(true);
  });

  it("centralizes all portfolio content in data files", () => {
    expect(hero.name).toBe("HANZLA");
    expect(hero.stats).toEqual([
      { value: 18, suffix: "+", label: "Happy Clients" },
      { value: 9, suffix: "+", label: "Projects Done" },
      { value: 100, suffix: "%", label: "Satisfaction" },
    ]);
    expect(socialLinks.github).toBe("https://github.com/1hanzla100");
    expect(skillGroups.map((group) => group.title)).toEqual([
      "Backend Engineering",
      "Data Engineering & ETL",
      "Cloud & DevOps",
      "Frontend Development",
      "Testing & Engineering Practices",
    ]);
    expect(
      skillGroups.flatMap((group) =>
        group.softwareSkills.map((skill) => skill.skillName),
      ),
    ).toEqual(
      expect.arrayContaining([
        "Python",
        "Django",
        "FastAPI",
        "Node.js",
        "PostgreSQL",
        "ClickHouse",
        "BigQuery",
        "Airflow",
        "Apache Spark",
        "AWS",
        "GCP",
        "Docker",
        "React.js",
        "Next.js",
        "TypeScript",
        "PyTest",
      ]),
    );
    expect(proficiency).toEqual([
      { label: "Backend Engineering", percentage: 95 },
      { label: "Data Engineering / ETL", percentage: 90 },
      { label: "Cloud & DevOps", percentage: 88 },
      { label: "Frontend Development", percentage: 82 },
      { label: "Testing & Reliability", percentage: 90 },
    ]);
    expect(education[0]).toMatchObject({
      schoolName: expect.any(String),
      subHeader: expect.any(String),
      duration: expect.any(String),
    });
    expect(experience.length).toBeGreaterThanOrEqual(4);
    expect(testimonials).toHaveLength(3);
    expect(projects).toHaveLength(4);
  });

  it("keeps visual defaults brutalist and unrounded", async () => {
    const css = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    );

    expect(css).toContain("--terminal-signal: #FF3D00");
    expect(css).toContain("--radius: 0px");
    expect(css).toContain(".grid-overlay::before");
    expect(css).toContain(".glitch:hover::before");
    expect(css).toContain(".progress-brutalist");
  });

  it("uses consistent vertical rhythm between skill groups", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/sections/SkillsSection.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain("space-y-12 md:space-y-16");
  });

  it("stacks proficiency bars below the section heading in two columns", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/sections/ProficiencySection.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain('className="space-y-12"');
    expect(source).toContain('className="grid gap-8 md:grid-cols-2"');
    expect(source).not.toContain("md:grid-cols-[0.8fr_1.2fr]");
  });

  it("stretches project cards to consistent row heights", async () => {
    const [sectionSource, cardSource] = await Promise.all([
      import("node:fs/promises").then((fs) =>
        fs.readFile(
          new URL("../components/sections/ProjectsSection.tsx", import.meta.url),
          "utf8",
        ),
      ),
      import("node:fs/promises").then((fs) =>
        fs.readFile(
          new URL("../components/cards/ProjectCard.tsx", import.meta.url),
          "utf8",
        ),
      ),
    ]);

    expect(sectionSource).toContain('className="h-full"');
    expect(cardSource).toContain('className="flex h-full flex-col"');
  });

  it("keeps the contact avatar aligned responsively", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/sections/ContactSection.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain("md:items-center");
    expect(source).toContain("mx-auto");
    expect(source).toContain("md:ml-auto");
    expect(source).toContain("aspect-square");
    expect(source).toContain("sm:w-48");
    expect(source).toContain("md:w-56");
    expect(source).toContain("lg:w-64");
  });

  it("centers mobile hero text vertically without changing desktop alignment", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/sections/HeroSection.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain("justify-start");
    expect(source).toContain("my-auto");
    expect(source).toContain("pt-20");
    expect(source).toContain("md:min-h-screen");
    expect(source).toContain("md:justify-end");
    expect(source).toContain("md:my-0");
    expect(source).toContain("md:pt-24");
  });

  it("keeps decorative section wrapper numbers out of the content start area", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/layout/SectionWrapper.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain("top-3");
    expect(source).toContain("text-[48px]");
    expect(source).toContain("md:top-2");
    expect(source).toContain("md:text-[80px]");
    expect(source).toContain("aria-hidden");
  });

  it("keeps software skill badges focused and readable", () => {
    const badgeNames = skillGroups.flatMap((group) =>
      group.softwareSkills.map((skill) => skill.skillName),
    );
    const capabilityText = skillGroups
      .flatMap((group) => group.capabilities)
      .join(" ");

    expect(
      skillGroups.every((group) => group.softwareSkills.length <= 7),
    ).toBe(true);
    expect(badgeNames).not.toEqual(
      expect.arrayContaining([
        "REST APIs",
        "GraphQL",
        "WebSockets",
        "Celery",
        "Apache Superset",
        "TDD",
        "Agile/Scrum",
      ]),
    );
    expect(capabilityText).toContain("REST APIs");
    expect(capabilityText).toContain("GraphQL");
    expect(capabilityText).toContain("WebSockets");
    expect(capabilityText).toContain("Celery");
    expect(capabilityText).toContain("Apache Superset");
    expect(capabilityText).toContain("TDD");
    expect(capabilityText).toContain("Agile/Scrum");
  });

  it("uses matching company-specific logos for experience cards", () => {
    const expectedLogos = {
      ClarityInAI: "/img/icons/common/clarityinai.svg",
      "Product Genius": "/img/icons/common/product_genius.svg",
      "Duseca Software": "/img/icons/common/duseca_software.svg",
      "Meganos Software": "/img/icons/common/meganos.svg",
      "Bleed AI": "/img/icons/common/bleed_ai.svg",
    };

    for (const item of experience) {
      expect(item.companyLogo).toBe(
        expectedLogos[item.company as keyof typeof expectedLogos],
      );
      expect(
        existsSync(
          new URL(`../public${item.companyLogo}`, import.meta.url),
        ),
      ).toBe(true);
    }
  });
});

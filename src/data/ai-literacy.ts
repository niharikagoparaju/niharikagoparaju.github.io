// Content for the AI literacy page (/ai-literacy/): Lectures (`lectures`, plus any
// `presentations`) and, when there are any, Resources (`resources`).
// Hands-on tools live on the AI Toolkit page instead (src/data/ai-toolkit.ts).
//
// To add a presentation:
//   1. Put the .pptx in public/presentations/ (a filename without spaces is tidiest,
//      e.g. 2026-11-ai-literacy-grand-rounds.pptx).
//   2. Add an entry to `presentations` below. Order doesn't matter; newest shows first.
//
// To add a handout, put the file in public/resources/ and link it as '/resources/<file>'.

export interface Presentation {
  title: string;
  /** 'YYYY-MM-DD' */
  date: string;
  /** Where it was given. */
  venue?: string;
  description?: string;
  /** Path to the .pptx, e.g. '/presentations/2026-11-ai-literacy.pptx'. */
  file?: string;
  /** Path to a PDF export. */
  pdf?: string;
  /** Any external URL (recording, Google Slides). */
  link?: string;
  /** Text for `link`. Defaults to "Related link". */
  linkLabel?: string;
}

export interface ResourceGroup {
  group: string;
  items: { title: string; url: string; note?: string }[];
}

export interface PageLink {
  title: string;
  href: string;
  description: string;
}

/** Lecture series and their slides. */
export const lectures: PageLink[] = [
  {
    title: 'DATA-MD lecture series',
    href: '/ai-literacy/data-md/',
    description: 'A four-session curriculum on AI for medical trainees, from core concepts to clinical documentation.',
  },
];

export interface SeriesSession {
  title: string;
  description: string;
  topics: string[];
  pdf: string;
}

export const dataMd = {
  title: 'DATA-MD lecture series',
  fullName: 'Data-Driven, Technology-Assisted Medical Decision Making for Medical Trainees',
  authors: [
    'Emily Balczewski, PhD',
    'Andrew Wong, MD, MS',
    'Cornelius James, MD',
    'Niharika Goparaju, MD',
    'Thomas East, PhD',
    'Joanne Baker, DO',
    'Thalia Nguyen, MD',
    'Serena Wang, MD',
    'Lisa Zickuhr, MD',
  ],
  sessions: [
    {
      title: 'Introduction to AI',
      description: 'What AI is, why clinicians need to understand it, and where it is already changing medicine.',
      topics: ['AI trends', 'Key terms', 'The model lifecycle', 'Clinical applications'],
      pdf: '/presentations/data-md/data-md-session-1-introduction-to-ai.pdf',
    },
    {
      title: 'Error and bias in AI systems',
      description: 'Where large language models go wrong, how bias enters, and how better prompts improve output.',
      topics: ['Sources of error and bias', 'Prompting techniques', 'Group activity: drafting a case report with an LLM'],
      pdf: '/presentations/data-md/data-md-session-2-error-and-bias.pdf',
    },
    {
      title: 'Automation and benchmarks',
      description: 'Where clinicians fit in human–AI teams, and how to read a study that benchmarks AI against doctors.',
      topics: ['Levels of automation', 'AI benchmarks', 'Critical appraisal of an AI study'],
      pdf: '/presentations/data-md/data-md-session-3-automation-and-benchmarks.pdf',
    },
    {
      title: 'AI documentation and future directions',
      description: 'Evaluating AI tools for clinical documentation, including ambient scribes, and what comes next.',
      topics: ['AI for clinical documentation', 'Ambient scribes', 'Resources for learning more', 'Future directions'],
      pdf: '/presentations/data-md/data-md-session-4-documentation-and-future-directions.pdf',
    },
  ] satisfies SeriesSession[],
};

export const presentations: Presentation[] = [
  // {
  //   title: 'AI literacy for pediatric emergency medicine',
  //   date: '2026-11-01',
  //   venue: "PEM Fellows' Conference, Dell Children's Medical Center",
  //   description: "What large language models can and can't do in the ED, and how to use them safely.",
  //   file: '/presentations/2026-11-ai-literacy-pem.pptx',
  //   pdf: '/presentations/2026-11-ai-literacy-pem.pdf',
  // },
];

export const resources: ResourceGroup[] = [
  // {
  //   group: 'Handouts',
  //   items: [
  //     { title: 'Prompting checklist for clinicians', url: '/resources/prompting-checklist.pdf', note: 'One-page reference.' },
  //   ],
  // },
];

// Content for the AI literacy page (/ai-literacy/).
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

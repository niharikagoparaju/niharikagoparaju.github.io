// Site-wide details: name, roles, contact links, navigation.

export interface Link {
  label: string;
  /** Leave as '' to hide the link. */
  url: string;
}

export const site = {
  name: 'Niharika Goparaju',
  /** Degrees, shown after the name on the home page. */
  credentials: 'MD MPH',
  description:
    "Pediatric emergency medicine physician at Dell Children's Medical Center and assistant clinical professor at the University of Texas at Austin Dell Medical School.",

  /** Shown under the name on the home page, one per line. */
  roles: [
    "Pediatric emergency medicine physician, Dell Children's Medical Center",
    'Assistant Clinical Professor, Dell Medical School at The University of Texas at Austin',
  ],

  /** Optional portrait: put the image in public/ and set e.g. '/headshot.jpg'. Empty hides it. */
  photo: '/headshot.jpg',

  links: [
    { label: 'Email', url: '' }, // 'mailto:name@example.com'
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/niharika-goparaju/' },
    { label: 'Dell Med profile', url: '' },
    { label: 'Google Scholar', url: '' },
    { label: 'ORCID', url: 'https://orcid.org/0000-0003-3983-4355' },
  ] satisfies Link[],

  /** Footer disclaimer. Set to '' to remove. */
  disclaimer:
    "Views expressed here are my own and do not represent Dell Children's Medical Center or The University of Texas at Austin.",

  /** Top navigation. Add an entry when you add a page (e.g. a blog). */
  nav: [
    { title: 'About', href: '/' },
    { title: 'AI literacy', href: '/ai-literacy/' },
    { title: 'AI Toolkit', href: '/ai-toolkit/' },
    { title: 'Publications', href: '/publications/' },
  ],
};

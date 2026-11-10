// Site-wide details: name, roles, contact links, navigation.

export interface Link {
  label: string;
  /** Leave as '' to hide the link. */
  url: string;
}

export const site = {
  name: 'Niharika Goparaju',
  description:
    "Pediatric emergency medicine physician at Dell Children's Medical Center and faculty at the University of Texas at Austin Dell Medical School.",

  /** Shown under the name on the home page, one per line. */
  roles: [
    "Pediatric emergency medicine physician, Dell Children's Medical Center",
    'Faculty, Dell Medical School at The University of Texas at Austin',
  ],

  /** Optional portrait: put the image in public/ and set e.g. '/headshot.jpg'. Empty hides it. */
  photo: '',

  links: [
    { label: 'Email', url: '' }, // 'mailto:name@example.com'
    { label: 'LinkedIn', url: '' },
    { label: 'Dell Med profile', url: '' },
    { label: 'Google Scholar', url: '' },
  ] satisfies Link[],

  /** Footer disclaimer. Set to '' to remove. */
  disclaimer:
    "Views expressed here are my own and do not represent Dell Children's Medical Center or The University of Texas at Austin.",

  /** Top navigation. Add an entry when you add a page (e.g. a blog). */
  nav: [
    { title: 'About', href: '/' },
    { title: 'AI literacy', href: '/ai-literacy/' },
  ],
};

import gazellePortrait from './assets/team/Gazelle-8-bit.jpg';
import gazelleProfile from './assets/team/Gazelle-Portfolio.jpg';

export const services = [
  {
    id: 'one-page',
    icon: '</>',
    title: 'One Page Websites',
    accent: 'cyan',
    summary:
      'A sharp single-page site for portfolios, trades, restaurants, events, and small service businesses.',
    features: ['Responsive landing page', 'Contact form setup', 'Basic SEO setup', 'Google Maps or WhatsApp link'],
    price: 'From R3,500',
    hosting: 'Hosting + care from R250/month',
    turnaround: '5-7 working days'
  },
  {
    id: 'multi-page',
    icon: 'MP',
    title: 'Multi Page Websites',
    accent: 'purple',
    summary:
      'A fuller business website with clear pages for services, about, gallery, testimonials, and enquiries.',
    features: ['Up to 5 core pages', 'CMS-ready structure', 'On-page SEO basics', 'Analytics and enquiry tracking'],
    price: 'From R7,500',
    hosting: 'Hosting + care from R350/month',
    turnaround: '10-15 working days'
  },
  {
    id: 'ecommerce',
    icon: 'EC',
    title: 'E-commerce',
    accent: 'green',
    summary:
      'Online stores for South African businesses that need products, payments, shipping, and sales-ready pages.',
    features: ['Up to 20 products loaded', 'PayFast or Yoco guidance', 'Shipping setup support', 'Store training handover'],
    price: 'From R14,500',
    hosting: 'Store hosting + care from R650/month',
    turnaround: '15-25 working days'
  }
];

export const projects = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    category: 'Web App',
    tag: 'React / Tailwind',
    summary: 'Real-time analytics experience for a finance team.',
    color: '#00e5ff',
    image: 'https://placehold.co/800x600/0B0F19/00E5FF?text=Web+App'
  },
  {
    id: 2,
    title: 'Design System',
    category: 'UI/UX',
    tag: 'Figma to Code',
    summary: 'A 200+ component interface kit with implementation rules.',
    color: '#b026ff',
    image: 'https://placehold.co/800x600/0B0F19/B026FF?text=UI+Kit'
  },
  {
    id: 3,
    title: 'Startup Brand',
    category: 'Brand Identity',
    tag: 'Graphic',
    summary: 'Logo, collateral, and social assets for a launch campaign.',
    color: '#39ff14',
    image: 'https://placehold.co/800x600/0B0F19/39FF14?text=Brand+Identity'
  },
  {
    id: 4,
    title: 'EcoFood Market',
    category: 'Web App',
    tag: 'Commerce',
    summary: 'Organic food ordering flow with reusable product modules.',
    color: '#00e5ff',
    image: 'https://placehold.co/800x600/0B0F19/00E5FF?text=Commerce'
  },
  {
    id: 5,
    title: 'Bloom Cosmetics',
    category: 'Brand Identity',
    tag: 'Packaging',
    summary: 'Luxury packaging language and launch-ready brand guide.',
    color: '#b026ff',
    image: 'https://placehold.co/800x600/0B0F19/B026FF?text=Packaging'
  },
  {
    id: 6,
    title: 'Motion Launch Kit',
    category: 'Marketing',
    tag: 'Motion',
    summary: 'Short-form motion graphics and campaign design assets.',
    color: '#39ff14',
    image: 'https://placehold.co/800x600/0B0F19/39FF14?text=Motion'
  }
];

const createPortraitSvg = (name, accent, secondaryAccent) => {
  const safeName = name.replace(/'/g, '').trim();
  const initials = safeName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
      <rect width="600" height="800" fill="#050505" />
      <rect x="50" y="50" width="500" height="700" rx="32" fill="#0e1722" stroke="${accent}" stroke-width="6" />
      <circle cx="300" cy="290" r="128" fill="${accent}" opacity="0.18" />
      <circle cx="300" cy="290" r="92" fill="${secondaryAccent}" opacity="0.24" />
      <path d="M208 590c24-128 160-128 184 0" fill="${accent}" opacity="0.26" />
      <path d="M190 680h220" stroke="#f7fbff" stroke-width="8" stroke-linecap="round" />
      <text x="300" y="748" text-anchor="middle" fill="#f7fbff" font-size="34" font-family="Arial, sans-serif">${safeName}</text>
      <text x="300" y="110" text-anchor="middle" fill="${accent}" font-size="44" font-family="Arial, sans-serif">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const teamMembers = [
  {
    id: 1,
    name: 'Gazelle Pearson',
    role: 'CEO/Founder',
    bio: 'Shapes the studio voice, visual language, and big-picture storytelling.',
    status: 'Founder',
    image: gazellePortrait,
    secondaryImage: gazelleProfile,
    imageAlt: 'Portrait of Gazelle Pearson'
  },
  {
    id: 2,
    name: 'Joshua Jacobs',
    role: 'CTO/Co-Founder',
    bio: 'Turns layouts into lively, accessible experiences with polished interactions.',
    status: 'Co-founder',
    image: createPortraitSvg('Joshua Jacobs', '#b026ff', '#00e5ff'),
    secondaryImage: createPortraitSvg('Joshua Jacobs', '#39ff14', '#00e5ff'),
    imageAlt: 'Portrait of Joshua Jacobs'
  },
  {
    id: 3,
    name: 'Natheefah Rayners',
    role: 'COO',
    bio: 'Crafts identity systems, motion concepts, and campaign-ready assets.',
    status: 'Placeholder',
    image: createPortraitSvg('Natheefah Rayners', '#39ff14', '#00e5ff'),
    secondaryImage: createPortraitSvg('Natheefah Rayners', '#00e5ff', '#b026ff'),
    imageAlt: 'Portrait of Natheefah Rayners'
  },
  {
    id: 4,
    name: 'Thina Maliwa',
    role: 'Product Strategist',
    bio: 'Connects business goals with clear user flows and measurable outcomes.',
    status: 'Placeholder',
    image: createPortraitSvg('Thina Maliwa', '#00e5ff', '#39ff14'),
    secondaryImage: createPortraitSvg('Thina Maliwa', '#b026ff', '#00e5ff'),
    imageAlt: 'Portrait of Thina Maliwa'
  },
  {
    id: 5,
    name: 'Siza Mpafa',
    role: 'UX Researcher',
    bio: 'Maps audience needs into practical insights and thoughtful interface choices.',
    status: 'Placeholder',
    image: createPortraitSvg('Siza Mpafa', '#b026ff', '#39ff14'),
    secondaryImage: createPortraitSvg('Siza Mpafa', '#00e5ff', '#b026ff'),
    imageAlt: 'Portrait of Siza Mpafa'
  },
  {
    id: 6,
    name: 'Keanu Visagie',
    role: 'Motion Artist',
    bio: 'Brings energy and rhythm to launch content and animated brand moments.',
    status: 'Placeholder',
    image: createPortraitSvg('Keanu Visagie', '#39ff14', '#b026ff'),
    secondaryImage: createPortraitSvg('Keanu Visagie', '#00e5ff', '#39ff14'),
    imageAlt: 'Portrait of Keanu Visagie'
  },
  {
    id: 7,
    name: 'Antonio Williams',
    role: 'Content Designer',
    bio: 'Builds copy systems that make product messaging feel clear and human.',
    status: 'Placeholder',
    image: createPortraitSvg('Antonio Williams', '#00e5ff', '#b026ff'),
    secondaryImage: createPortraitSvg('Antonio Williams', '#39ff14', '#00e5ff'),
    imageAlt: 'Portrait of Antonio Williams'
  },
  {
    id: 8,
    name: 'Yaqoob Samsodien',
    role: 'Systems Engineer',
    bio: 'Keeps projects scalable with thoughtful architecture and reliable implementation.',
    status: 'Placeholder',
    image: createPortraitSvg('Yaqoob Samsodien', '#b026ff', '#00e5ff'),
    secondaryImage: createPortraitSvg('Yaqoob Samsodien', '#39ff14', '#b026ff'),
    imageAlt: 'Portrait of Yaqoob Samsodien'
  },
  {
    id: 9,
    name: 'Phoenix Chung',
    role: 'Community Manager',
    bio: 'Guides launch communications, social presence, and client feedback loops.',
    status: 'Placeholder',
    image: createPortraitSvg('Phoenix Chung', '#39ff14', '#00e5ff'),
    secondaryImage: createPortraitSvg('Phoenix Chung', '#00e5ff', '#39ff14'),
    imageAlt: 'Portrait of Phoenix Chung'
  },
  {
    id: 10,
    name: 'Lutfeeyah Cupido',
    role: 'QA & Refinement',
    bio: 'Polishes details, checks flows, and makes sure every release feels smooth.',
    status: 'Placeholder',
    image: createPortraitSvg('Lutfeeyah Cupido', '#00e5ff', '#b026ff'),
    secondaryImage: createPortraitSvg('Lutfeeyah Cupido', '#b026ff', '#39ff14'),
    imageAlt: 'Portrait of Lutfeeyah Cupido'
  },
  {
    id: 11,
    name: 'Jose Dhlamini',
    role: 'Operations Lead',
    bio: 'Keeps timelines, handoffs, and delivery moving without friction.',
    status: 'Placeholder',
    image: createPortraitSvg('Jose Dhlamini', '#b026ff', '#00e5ff'),
    secondaryImage: createPortraitSvg('Jose Dhlamini', '#39ff14', '#00e5ff'),
    imageAlt: 'Portrait of Jose Dhlamini'
  },
  {
    id: 12,
    name: 'Mogamat Toufeeq Farat',
    role: 'Creative Technologist',
    bio: 'Bridges storytelling and code with playful interactions, clever UI moments, and polished digital experiences.',
    status: 'Placeholder',
    image: createPortraitSvg('Mogamat Toufeeq Farat', '#39ff14', '#00e5ff'),
    secondaryImage: createPortraitSvg('Mogamat Toufeeq Farat', '#00e5ff', '#b026ff'),
    imageAlt: 'Portrait of Mogamat Toufeeq Farat'
  }
];

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/teams', label: 'Teams' },
  { href: '/8-bit', label: '8-bit' },
  { href: '/contact', label: 'Contact' }
];

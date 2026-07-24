import { useEffect, useMemo, useState } from 'react';
import { navItems, projects, services, teamMembers } from './data.js';
import Arcade from './components/Arcade.jsx';
import pixelCraftLogo from './assets/PC_Logo_cropped.png';

function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (href) => {
    if (href === window.location.pathname) return;
    window.history.pushState({}, '', href);
    setPath(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate];
}

function useSentenceTypewriter(path) {
  useEffect(() => {
    const selector = [
      'main p:not(.eyebrow)',
      'main li',
      'main dd',
      '.project-overlay p',
      '.arcade-meta span:last-child',
      '.pong-score span',
      '.form-success'
    ].join(', ');

    const elements = Array.from(document.querySelectorAll(selector)).filter(
      (element) => element.textContent.trim().length > 0
    );

    elements.forEach((element) => {
      element.classList.add('typewriter-line');
    });

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('typewriter-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('typewriter-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.01 }
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        element.classList.add('typewriter-visible');
      } else {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [path]);
}

function App() {
  const [path, navigate] = usePath();
  useSentenceTypewriter(path);

  const Page = useMemo(() => {
    if (path === '/services') return ServicesPage;
    if (path === '/portfolio') return PortfolioPage;
    if (path === '/teams') return TeamsPage;
    if (path === '/8-bit') return ArcadePage;
    if (path === '/contact') return ContactPage;
    return HomePage;
  }, [path]);

  return (
    <>
      <Header path={path} navigate={navigate} />
      <main>
        <Page navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function LinkButton({ href, navigate, children, className = '' }) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function Header({ path, navigate }) {
  const [open, setOpen] = useState(false);

  const go = (href) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a
          className="brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            go('/');
          }}
        >
          <span className="brand-mark"><img src={pixelCraftLogo} alt="PixelCraft Logo" /></span>
          <span>
          <span className="gradient-text">PixelCraft</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={path === item.href ? 'active' : ''}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                go(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={path === item.href ? 'active' : ''}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                go(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero section">
        <div className="hero-bg-grid" />
        <div className="container hero-content">
          <h1>
            <span className="gradient-text">Pixel Perfect.</span>
            <br />
            Built For The <span className="mono cyan">Screen.</span>
          </h1>
          <p className="hero-copy">
            High-performance websites and beautiful graphic design, with Figma and code
            kept in perfect sync.
          </p>
          <div className="button-row">
            <LinkButton href="/portfolio" navigate={navigate} className="btn primary">
              View Our Work
            </LinkButton>
            <LinkButton href="/contact" navigate={navigate} className="btn secondary">
              Get a Quote
            </LinkButton>
          </div>
          <div className="skill-strip">
            <span>UI/UX</span>
            <span>React.js / Next.js</span>
            <span>Tailwind</span>
          </div>
        </div>
      </section>
      <ServicesPreview navigate={navigate} />
      <RecentProjects navigate={navigate} />
    </>
  );
}

function ServicesPreview({ navigate }) {
  return (
    <section className="section band">
      <div className="container">
        <SectionHeader eyebrow="// SERVICES" title="Services we offer" />
        <div className="card-grid three">
          {services.map((service) => (
            <article className={`service-card accent-${service.accent}`} key={service.id}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <p className="service-price">{service.price}</p>
            </article>
          ))}
        </div>
        <div className="center-action">
          <LinkButton href="/services" navigate={navigate} className="btn ghost">
            Explore all services
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function RecentProjects({ navigate }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="// PORTFOLIO" title="Recent projects" />
        <ProjectGrid items={projects.slice(0, 3)} />
        <div className="center-action">
          <LinkButton href="/portfolio" navigate={navigate} className="btn ghost">
            See full portfolio
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ navigate }) {
  return (
    <>
      <PageHero eyebrow="// SERVICES" title="Services we offer" copy="Practical website packages priced for South African small businesses, with hosting and monthly care available." />
      <section className="section">
        <div className="container">
          <div className="pricing-grid" aria-label="Website pricing packages">
            {services.map((service) => (
              <article
                key={service.id}
                className={`price-card accent-${service.accent}`}
              >
                <div className="service-icon">{service.icon}</div>
                <h2>{service.title}</h2>
                <p className="package-price">{service.price}</p>
                <p>{service.summary}</p>
                <p className="hosting-line">{service.hosting}</p>
                <p className="turnaround-line">{service.turnaround}</p>
                <ul className="check-list">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <LinkButton href="/contact" navigate={navigate} className="btn primary">
                  Get a Quote
                </LinkButton>
              </article>
            ))}
          </div>
          <div className="hosting-note">
            <p>
              Hosting is billed monthly and can include domain assistance, SSL, backups, updates, uptime checks,
              and small content changes. Domain registration and paid plugins are quoted separately when needed.
            </p>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="container">
          <SectionHeader eyebrow="// PROCESS" title="How we work" />
          <div className="process-grid">
            {['Discovery', 'Strategy', 'Design', 'Build', 'Launch'].map((step, index) => (
              <article className="process-step" key={step}>
                <span>{index + 1}</span>
                <h3>{step}</h3>
                <p>Clear checkpoints, fast feedback loops, and practical delivery from first call to final handoff.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PortfolioPage({ navigate }) {
  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? projects : projects.filter((project) => project.category === active);

  return (
    <>
      <PageHero eyebrow="// PORTFOLIO" title="Portfolio" copy="A sharper look at recent web, brand, and digital product work." />
      <section className="section">
        <div className="container">
          <div className="tabs filter-tabs" aria-label="Portfolio filters">
            {categories.map((category) => (
              <button
                key={category}
                className={active === category ? 'active' : ''}
                type="button"
                onClick={() => setActive(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <ProjectGrid items={visible} />
        </div>
      </section>
      <Cta navigate={navigate} title="Inspired by the work?" button="Start your project" />
    </>
  );
}

function TeamsPage() {
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    if (!activeMember) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveMember(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeMember]);

  return (
    <>
      <PageHero
        eyebrow="// TEAM"
        title="Meet the crew"
        copy="Placeholder profiles for the studio roster, ready to be swapped for real bios and portraits."
      />
      <section className="section">
        <div className="container">
          <div className="team-grid" aria-label="Studio team members">
            {teamMembers.map((member) => {
              const initials = member.name
                .split(' ')
                .map((part) => part[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();

              return (
                // Clickable team card opens the profile modal.
                <button
                  className="team-card team-card-button"
                  type="button"
                  key={member.id}
                  onClick={() => setActiveMember(member)}
                >
                  <div className="team-avatar" aria-hidden="true">
                    {member.image ? (
                      <img src={member.image} alt={member.imageAlt || member.name} />
                    ) : (
                      initials
                    )}
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p>{member.bio}</p>
                  <span className="team-status">{member.status}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activeMember && (
        <div className="team-modal-backdrop" role="presentation" onClick={() => setActiveMember(null)}>
          <div
            className="team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="team-modal-close" type="button" aria-label="Close profile" onClick={() => setActiveMember(null)}>
              ×
            </button>
            <img
              className="team-modal-image"
              src={activeMember.secondaryImage || activeMember.image}
              alt={activeMember.imageAlt || `${activeMember.name} portrait`}
            />
            <div className="team-modal-content">
              <p className="team-role team-modal-role">{activeMember.role}</p>
              <h3 id="team-modal-title">{activeMember.name}</h3>
              <p>{activeMember.bio}</p>
              <p className="team-modal-description">
                A polished profile preview with room for a real portrait, a fuller story, and future contact details.
              </p>
              <span className="team-status">{activeMember.status}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ArcadePage() {
  return (
    <>
      <PageHero eyebrow="// 8-BIT ARCADE" title="Playable retro" copy="Snake, Tetris, and Pong rebuilt as a React canvas page." />
      <Arcade />
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <PageHero eyebrow="// CONTACT" title="Let's build" copy="Tell us what you are making and we will help shape the next move." />
      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-panel">
            <h2>Get in touch</h2>
            <p>Ready to turn your idea into a pixel-perfect reality? Reach out with a few project details.</p>
            <dl>
              <dt>Email</dt>
              <dd>hello@pixelcraft.studio</dd>
              <dt>Phone</dt>
              <dd>+1 (555) 000-9999</dd>
              <dt>Instagram</dt>
              <dd>@pixelcraft_studio5</dd>
            </dl>
          </aside>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <label>
                Name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="you@example.com" />
              </label>
            </div>
            <label>
              Project Type
              <input name="project" placeholder="Web, brand, product, arcade..." />
            </label>
            <label>
              Message
              <textarea name="message" rows="6" required placeholder="Tell us about your vision..." />
            </label>
            <button className="btn primary" type="submit">Send Message</button>
            {sent && <p className="form-success">Thanks. Your message is ready for the next step.</p>}
          </form>
        </div>
      </section>
    </>
  );
}

function ProjectGrid({ items }) {
  return (
    <div className="project-grid">
      {items.map((project) => (
        <article className="project-card" key={project.id} style={{ '--project-color': project.color }}>
          <img src={project.image} alt="" />
          <div className="project-overlay">
            <span>{project.tag}</span>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function PageHero({ eyebrow, title, copy }) {
  return (
    <section className="page-hero section">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function Cta({ navigate, title, button }) {
  return (
    <section className="section cta">
      <div className="container">
        <h2>{title}</h2>
        <LinkButton href="/contact" navigate={navigate} className="btn primary">
          {button}
        </LinkButton>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container footer-layout">
        <span className="mono">© 2026 PixelCraft Studios</span>
        <div>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default App;

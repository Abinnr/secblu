import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { APP_VERSION, projects, sampleProfile } from './data.js';

function Icon({ name = 'shield', ...props }) {
  const paths = {
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" /><path d="m8 12 3 3 5-6" /></>,
    cloud: <><path d="M6 18a4 4 0 0 1-1-7.9A7 7 0 0 1 18.6 9 4.5 4.5 0 0 1 18 18" /><path d="M12 13v8m-3-3 3 3 3-3" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.shield}</svg>;
}

function PageIntro({ eyebrow, title, children }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro-copy">{children}</p></div>;
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> YOUR CLOUD JOURNEY STARTS HERE</p>
        <h1>Learn by building.<br /><span>Grow by deploying.</span></h1>
        <p className="hero-description">Welcome to SecuBlu Cloud Training. A small application for a big first step: taking your code from your laptop to the cloud.</p>
        <div className="actions"><Link className="button primary" to="/projects">Explore projects <Icon name="arrow" /></Link><Link className="button secondary" to="/profile">Meet your profile</Link></div>
        <p className="hero-note"><Icon name="check" /> Frontend only <span>·</span> My sample data <span>·</span> Ready to deploy</p>
      </div>
      <div className="deployment-visual" aria-label="Deployment workflow: local code, production build, Nginx server">
        <div className="visual-header"><span className="visual-dots">● ● ●</span><span>YOUR DEPLOYMENT WORKSPACE</span></div>
        <div className="cloud-orbit"><Icon name="cloud" /><span className="orbit-dot" /></div>
        <div className="pipeline"><div><span>01</span><strong>Write your code</strong><small>React + JavaScript</small></div><div><span>02</span><strong>Build for production</strong><small>npm run build → dist/</small></div><div><span>03</span><strong>Bring it online</strong><small>Serve with Nginx</small></div></div>
        <div className="visual-footer"><span className="status-dot" /> YOUR NEXT RELEASE STARTS HERE <span>{APP_VERSION}</span></div>
      </div>
    </section>
    <section className="getting-started" aria-labelledby="start-title">
      <div className="section-heading"><div><p className="eyebrow">A SIMPLE PLACE TO PRACTICE</p><h2 id="start-title">Three pages. Plenty to learn.</h2></div><p>Get comfortable with the app,<br />then make it your own.</p></div>
      <div className="feature-grid">
        <Link className="feature-card" to="/profile"><span className="icon-box"><Icon name="user" /></span><h3>Your learning profile <Icon name="arrow" /></h3><p>Edit sample details, share your skills, and set your next learning goals.</p><span className="text-link">Make it yours</span></Link>
        <Link className="feature-card" to="/projects"><span className="icon-box mint"><Icon name="shield" /></span><h3>Hands-on projects <Icon name="arrow" /></h3><p>Explore three sample projects across cloud deployment and cybersecurity.</p><span className="text-link">Find your next challenge</span></Link>
        <article className="feature-card"><span className="icon-box lavender"><Icon name="terminal" /></span><h3>Your first deployment</h3><p>Change the version label, build the app, and serve the output with Nginx.</p><span className="card-note">Follow the project README</span></article>
      </div>
    </section>
    <aside className="training-note"><Icon name="shield" /><p><strong>A focused training environment.</strong> Everything here uses local sample data. No account, backend, database, or API keys required.</p><span className="pill">LEARN · BUILD · DEPLOY</span></aside>
  </>;
}

function Profile({ profile, setProfile }) {
  const [draft, setDraft] = useState(profile);
  const [message, setMessage] = useState('');
  const initials = profile.name.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join('');
  function save(event) {
    event.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()]));
    if (Object.values(cleaned).some(value => !value)) {
      setMessage('Please fill in each field before saving.');
      return;
    }
    setProfile(cleaned);
    setDraft(cleaned);
    setMessage('Profile updated for this visit. Refreshing the page restores the sample details.');
  }
  return <>
    <PageIntro eyebrow="YOUR LEARNING SPACE" title="A little about you.">Start with our sample profile, then add your own skills and goals.</PageIntro>
    <div className="profile-layout">
      <aside className="profile-summary"><div className="avatar">{initials}</div><span className="pill">SAMPLE LEARNER</span><h2>{profile.name}</h2><p>{profile.designation}</p><hr /><h3>Skills in your toolkit</h3><div className="tags">{profile.skills.split(',').filter(skill => skill.trim()).map((skill, index) => <span key={index}>{skill.trim()}</span>)}</div><h3>Your learning goals</h3><p className="goals">{profile.goals}</p></aside>
      <form className="profile-form" onSubmit={save} onChange={() => setMessage('')}><h2>Make this profile yours</h2><p>Edits stay in memory while you explore the app.</p>
        {[
          ['name', 'Name', 'text'], ['designation', 'Designation', 'text'], ['skills', 'Skills', 'text'], ['goals', 'Learning goals', 'textarea'],
        ].map(([key, label, type]) => <div className="field" key={key}><label htmlFor={key}>{label}</label>{type === 'textarea' ? <textarea id={key} value={draft[key]} maxLength={1000} required rows={4} onChange={event => setDraft({ ...draft, [key]: event.target.value })} /> : <input id={key} value={draft[key]} maxLength={key === 'skills' ? 400 : 100} required onChange={event => setDraft({ ...draft, [key]: event.target.value })} aria-describedby={key === 'skills' ? 'skills-hint' : undefined} />}{key === 'skills' && <small id="skills-hint">Separate skills with commas.</small>}</div>)}
        <div className="actions"><button className="button primary" type="submit">Save profile <Icon name="check" /></button><button className="button secondary" type="button" onClick={() => { setProfile({ ...sampleProfile }); setDraft({ ...sampleProfile }); setMessage('Sample profile restored.'); }}>Reset sample</button></div><p className="form-message" role="status">{message}</p>
      </form>
    </div>
  </>;
}

function Projects() {
  return <>
    <PageIntro eyebrow="PUT YOUR SKILLS INTO PRACTICE" title="Small projects. Real learning.">Three sample cybersecurity and cloud exercises to inspire your next step.</PageIntro>
    <div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.title}><div className={`project-art art-${index}`}><Icon name={project.icon} /><span>0{index + 1} / TRAINING PROJECT</span></div><div className="project-body"><p className="eyebrow">{project.category}</p><h2>{project.title}</h2><p>{project.description}</p><div className="tags">{project.skills.map(skill => <span key={skill}>{skill}</span>)}</div><div className="outcome"><Icon name="check" /><p>{project.outcome}</p></div></div></article>)}</div>
    <aside className="training-note"><Icon name="terminal" /><p><strong>Start with this very app.</strong> Update the version label in <code>src/data.js</code>, run a production build, and verify your new release.</p></aside>
  </>;
}

function NotFound() {
  return <section className="not-found"><span className="error-code">404</span><h1>A little off the cloud path.</h1><p>This page doesn’t exist. Let’s get you back to your training.</p><Link to="/" className="button primary">Back to home <Icon name="arrow" /></Link></section>;
}

export default function App() {
  const [profile, setProfile] = useState({ ...sampleProfile });
  const { pathname } = useLocation();
  useEffect(() => {
    const name = { '/': 'Home', '/profile': 'Profile', '/projects': 'Projects' }[pathname] || 'Page not found';
    document.title = `${name} | SecuBlu Cloud Training`;
    window.scrollTo(0, 0);
  }, [pathname]);
  return <div className="app-shell"><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="header-inner"><Link className="brand" to="/" aria-label="SecuBlu Cloud Training home"><span className="brand-mark"><Icon /></span><span>Secu<span className="brand-blue">Blu</span><small>CLOUD TRAINING</small></span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/profile">Profile</NavLink><NavLink to="/projects">Projects</NavLink></nav><span className="version-label">{APP_VERSION}</span></div></header><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/profile" element={<Profile profile={profile} setProfile={setProfile} />} /><Route path="/projects" element={<Projects />} /><Route path="*" element={<NotFound />} /></Routes></main><footer><div><Link className="footer-brand" to="/">SecuBlu <span>Cloud Training</span></Link><p>Built for curious minds. Ready for the cloud.</p></div><div className="footer-meta"><span>Training application · Local sample data</span><span>{APP_VERSION}</span></div></footer></div>;
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { availability, contacts, experience, projects, skills, summary } from './content';
import styles from './cv.module.css';

const description =
  'Adam Pang builds full-stack products and AI agents, and does the customer work too. Austin area. Available to start immediately.';

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang · CV' },
  description,
  alternates: { canonical: '/cv' },
  openGraph: {
    type: 'profile',
    url: 'https://adampang.com/cv',
    siteName: 'adampang.com',
    title: 'Adam Pang · CV',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Pang · CV',
    description,
  },
};

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

export default function CvPage() {
  return (
    <main className={styles.page}>
      <p className={styles.toolbar}>
        <a href="/cv.pdf" download="Adam-Pang-CV.pdf">
          Download PDF
        </a>
      </p>

      <header className={styles.header}>
        <h1 className={styles.name}>Adam Pang</h1>
        <ul className={styles.contacts}>
          {contacts.map((item) => (
            <li key={item.href}>
              <ExternalLink href={item.href}>{item.label}</ExternalLink>
            </li>
          ))}
        </ul>
        <p className={styles.availability}>{availability}</p>
      </header>

      <p className={styles.summary}>{summary}</p>

      <section className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading">Selected projects</h2>
        <ol className={styles.entries}>
          {projects.map((project) => (
            <li key={project.name}>
              <div className={styles.entryHead}>
                <h3>
                  <ExternalLink href={project.href}>{project.name}</ExternalLink>
                </h3>
                <p className={styles.meta}>{project.meta}</p>
              </div>
              <p className={styles.body}>{project.text}</p>
              <ul className={styles.links}>
                {project.links.map((link) => (
                  <li key={link.href}>
                    <ExternalLink href={link.href}>{link.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <ol className={styles.entries}>
          {experience.map((job) => (
            <li key={job.org}>
              <div className={styles.entryHead}>
                <h3>
                  {job.org}
                  <span className={styles.role}>{job.role}</span>
                </h3>
                <p className={styles.meta}>{job.meta}</p>
              </div>
              <p className={styles.body}>{job.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        <dl className={styles.skills}>
          {skills.map((skill) => (
            <div key={skill.label}>
              <dt>{skill.label}</dt>
              <dd>{skill.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

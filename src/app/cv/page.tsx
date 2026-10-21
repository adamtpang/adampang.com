import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cv, parse, pdfHref } from './content';
import styles from './cv.module.css';

const description =
  'Adam Pang, software engineer in Austin. Quantus, EIGN, Grok Bot Hackathon co-winner, 5,660 GitHub contributions.';

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

function Link({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {parse(text).map((part, i) =>
        part.kind === 'bold' ? (
          <strong key={i}>{part.text}</strong>
        ) : part.kind === 'link' && part.href ? (
          <Link key={i} href={part.href}>
            {part.text}
          </Link>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

export default function CvPage() {
  return (
    <main className={styles.page}>
      <p className={styles.toolbar}>
        <a href={pdfHref} download="Adam-Pang-Resume.pdf">
          Download PDF
        </a>
      </p>

      <div className={styles.pdfFrame}>
        <iframe src={`${pdfHref}#view=FitH`} title="Adam Pang resume (PDF)" className={styles.pdf}>
          <p>
            Your browser cannot show the PDF here. <a href={pdfHref}>Open the resume PDF</a>.
          </p>
        </iframe>
      </div>
      <p className={styles.pdfFallback}>
        PDF: <a href={pdfHref}>open it</a> or <a href={pdfHref} download="Adam-Pang-Resume.pdf">download it</a>. Text version below.
      </p>

      <article className={styles.text} aria-label="Resume text version">
        <header className={styles.header}>
          <h1 className={styles.name}>{cv.name}</h1>
          <ul className={styles.contacts}>
            {cv.contacts.map((item) => (
              <li key={item.label}>
                {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
              </li>
            ))}
          </ul>
        </header>

        <section className={styles.section} aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          <ol className={styles.entries}>
            {cv.experience.map((job) => (
              <li key={job.org}>
                <div className={styles.entryHead}>
                  <h3>
                    {'href' in job && job.href ? <Link href={job.href}>{job.org}</Link> : job.org}
                    <span className={styles.role}>{job.role}</span>
                  </h3>
                  <p className={styles.meta}>{job.meta}</p>
                </div>
                <ul className={styles.bullets}>
                  {job.bullets.map((b) => (
                    <li key={b}>
                      <Rich text={b} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>
          <ol className={styles.entries}>
            {cv.projects.map((project) => (
              <li key={project.name}>
                <div className={styles.entryHead}>
                  <h3>
                    <Link href={project.href}>{project.name}</Link>
                  </h3>
                  <p className={styles.meta}>{project.meta}</p>
                </div>
                <ul className={styles.bullets}>
                  {project.bullets.map((b) => (
                    <li key={b}>
                      <Rich text={b} />
                    </li>
                  ))}
                </ul>
                <ul className={styles.links}>
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="achievements-heading">
          <h2 id="achievements-heading">Achievements</h2>
          <ul className={styles.bullets}>
            {cv.achievements.map((a) => (
              <li key={a}>
                <Rich text={a} />
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <ol className={styles.entries}>
            {cv.education.map((school) => (
              <li key={school.org}>
                <div className={styles.entryHead}>
                  <h3>
                    <Link href={school.href}>{school.org}</Link>
                    <span className={styles.role}>{school.role}</span>
                  </h3>
                  <p className={styles.meta}>{school.meta}</p>
                </div>
                <ul className={styles.bullets}>
                  {school.bullets.map((b) => (
                    <li key={b}>
                      <Rich text={b} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="skills-heading">
          <h2 id="skills-heading">Skills</h2>
          <dl className={styles.skills}>
            {cv.skills.map((skill) => (
              <div key={skill.label}>
                <dt>{skill.label}</dt>
                <dd>
                  <Rich text={skill.text} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className={styles.updated}>{cv.updated}</p>
      </article>
    </main>
  );
}

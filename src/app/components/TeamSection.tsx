'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { User } from 'lucide-react';
import Image from 'next/image';
import { AnimatedBackground } from './AnimatedBackground';

interface ExperienceBadge {
  name: string;
  /** Tailwind bg + text colour classes for the badge */
  style: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  photoSrc: string | null;
  linkedin: string | null;
  education: string;
  experience: ExperienceBadge[];
}

// §6 weight-hierarchy: credentials visible at a glance — critical for investors
const TEAM: TeamMember[] = [
  {
    name: 'Shlok Shah',
    role: 'Co-Founder',
    bio: 'Building the agentic AI system that powers Pinit\'s vibe engine — extracting and quantifying restaurant vibes at scale.',
    initials: 'SS',
    photoSrc: null,
    linkedin: null,
    education: 'MEng Computing (AI & ML) · Imperial College London',
    experience: [
      { name: 'HubSpot', style: 'bg-[#FF7A59]/15 text-[#FF7A59]' },
      { name: 'incident.io', style: 'bg-[rgba(255,155,214,0.15)] text-[#ff9bd6]' },
    ],
  },
  {
    name: 'Sriharsha Vitta',
    role: 'Co-Founder',
    bio: 'Architecting the infrastructure that makes Pinit scale — from real-time location alerts to group vibe matching.',
    initials: 'SV',
    photoSrc: null,
    linkedin: null,
    education: 'BSc Maths & Computing · Imperial College London',
    experience: [
      { name: 'BlackRock', style: 'bg-[rgba(255,255,255,0.1)] text-[rgba(247,233,255,0.8)]' },
      { name: 'Palantir', style: 'bg-[rgba(100,180,255,0.15)] text-[#90c8f8]' },
    ],
  },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="section-dark" ref={sectionRef} aria-label="The founding team">
      <AnimatedBackground />

      <div className="section-content justify-center items-center gap-7 md:gap-10">
        {/* Badge */}
        <motion.div
          className="waitlist-badge"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: -12 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.35, ease: 'easeOut' },
          })}
        >
          <span className="waitlist-badge-dot" />
          The Team
        </motion.div>

        {/* §6 weight-hierarchy: bold large heading */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-center max-w-3xl leading-tight"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: 20 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.4, delay: 0.06, ease: "easeOut" },
          })}
        >
          Built by people who are tired of the group chat too
        </motion.h2>

        {/* §5 container-width: max-w-2xl for 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 w-full max-w-2xl">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              className="team-card"
              {...(reduced ? {} : {
                initial: { opacity: 0, y: 40 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.4, delay: 0.14 + i * 0.04, ease: "easeOut" },
              })}
              // §7 scale-feedback: spring lift on hover
              whileHover={reduced ? {} : {
                y: -6,
                transition: { type: 'spring', stiffness: 350, damping: 22 },
              }}
            >
              {/* Avatar */}
              <div className="team-avatar" role="img" aria-label={`${member.name} photo`}>
                {member.photoSrc ? (
                  <Image
                    src={member.photoSrc}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-10 h-10 text-[#ff9bd6]" aria-hidden="true" />
                )}
              </div>

              {/* Name + role — §6: bold name, pink accent role */}
              <div className="flex flex-col items-center gap-0.5">
                <p className="text-lg font-bold text-white leading-snug">{member.name}</p>
                <p className="text-sm font-medium text-[#ff9bd6]">{member.role}</p>
              </div>

              {/* Education — §6: muted secondary text */}
              <p className="text-xs text-[rgba(247,233,255,0.45)] text-center leading-snug px-2">
                {member.education}
              </p>

              {/* Experience badges — critical investor-facing credential display */}
              <div className="flex flex-wrap gap-2 justify-center" aria-label={`${member.name}'s previous experience`}>
                {member.experience.map((badge) => (
                  <span
                    key={badge.name}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${badge.style}`}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>

              {/* Bio — §6: 14px secondary, 1.6 line-height */}
              <p className="text-sm text-[rgba(247,233,255,0.62)] leading-relaxed text-center">
                {member.bio}
              </p>

              {/* LinkedIn link */}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="text-[rgba(247,233,255,0.4)] hover:text-[#ff9bd6] transition-colors duration-200 text-xs underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bd6] rounded"
                >
                  LinkedIn ↗
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

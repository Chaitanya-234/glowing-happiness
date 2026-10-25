import type { Design, Resume } from './types';
import { TEMPLATES } from './templates';

export const SAMPLE_DESIGN: Design = { template: 'modern', paper: 'a4', ...TEMPLATES.modern.defaults };

export const SAMPLE_RESUME: Resume = {
  basics: {
    name: 'Alex Morgan', title: 'Senior Software Engineer', email: 'alex.morgan@example.com', phone: '+1 555 010 0199', location: 'Austin, TX',
    links: [{ id: 'l1', label: 'linkedin.com/in/alexmorgan', url: 'https://linkedin.com/in/alexmorgan' }, { id: 'l2', label: 'github.com/alexmorgan', url: 'https://github.com/alexmorgan' }],
  },
  sections: [
    { id: 's-summary', kind: 'summary', title: 'Summary', visible: true,
      text: 'Backend-focused engineer with 8 years of experience building payment and data platforms that handle millions of requests a day. Comfortable owning a service from design to on-call.' },
    { id: 's-exp', kind: 'entries', title: 'Experience', visible: true, entries: [
      { id: 'e1', primary: 'Northwind Payments', secondary: 'Senior Software Engineer', location: 'Austin, TX', start: 'Mar 2021', end: 'Present', bullets: [
        'Cut p99 checkout latency from 840ms to 310ms by moving fraud scoring to an async pipeline.',
        'Led a team of 5 engineers migrating 40 services from VMs to Kubernetes with zero customer-facing downtime.',
        'Designed an idempotency layer that removed 99% of duplicate charges, saving about $1.2M a year.' ] },
      { id: 'e2', primary: 'Brightside Analytics', secondary: 'Software Engineer', location: 'Remote', start: 'Jun 2017', end: 'Feb 2021', bullets: [
        'Built an event ingestion service processing 25M events per day on Kafka and PostgreSQL.',
        'Reduced cloud spend by 32% through query tuning and storage tiering.',
        'Mentored 4 junior engineers; 3 were promoted within 18 months.' ] },
    ] },
    { id: 's-proj', kind: 'entries', title: 'Projects', visible: true, entries: [
      { id: 'p1', primary: 'OpenLedger', secondary: 'Go, PostgreSQL, gRPC', location: '', start: '2023', end: 'Present', bullets: [
        'Open-source double-entry ledger library with 1.8k GitHub stars and 40 contributors.' ] },
    ] },
    { id: 's-skills', kind: 'skills', title: 'Skills', visible: true, groups: [
      { id: 'g1', label: 'Languages', items: 'Go, Java, Python, TypeScript, SQL' },
      { id: 'g2', label: 'Infrastructure', items: 'Kubernetes, AWS, Terraform, Kafka, PostgreSQL, Redis' },
      { id: 'g3', label: 'Practices', items: 'System design, code review, incident response, mentoring' },
    ] },
    { id: 's-edu', kind: 'entries', title: 'Education', visible: true, entries: [
      { id: 'd1', primary: 'University of Texas at Austin', secondary: 'B.S. Computer Science', location: 'Austin, TX', start: '2013', end: '2017', bullets: [''] },
    ] },
    { id: 's-cert', kind: 'list', title: 'Certifications', visible: true, items: ['AWS Certified Solutions Architect – Associate (2022)', 'Certified Kubernetes Administrator (2021)'] },
  ],
};

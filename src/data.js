// Change this label, rebuild, and redeploy to practice releasing a new version.
export const APP_VERSION = 'Version 1.0';

export const sampleProfile = {
  name: 'Alex Morgan',
  designation: 'Cloud Security Intern',
  skills: 'Linux, Networking, JavaScript, Cloud fundamentals',
  goals: 'Deploy a React application with Nginx, understand browser routing, and practice secure cloud configuration.',
};

export const projects = [
  {
    title: 'Secure static website',
    category: 'Cloud deployment',
    icon: 'cloud',
    description: 'Build a frontend application and serve its production files with Nginx on a training virtual machine.',
    skills: ['React', 'Nginx', 'Linux'],
    outcome: 'Practice building, deploying, and verifying a release.',
  },
  {
    title: 'Cloud access review',
    category: 'Identity & access',
    icon: 'shield',
    description: 'Review a fictional set of cloud roles and identify permissions that exceed each team member’s needs.',
    skills: ['IAM', 'Least privilege', 'Security'],
    outcome: 'Document a clear, least-privilege access plan.',
  },
  {
    title: 'Security log investigation',
    category: 'Threat detection',
    icon: 'terminal',
    description: 'Explore sample authentication logs and outline how to recognize suspicious sign-in patterns.',
    skills: ['Log analysis', 'Monitoring', 'Incident response'],
    outcome: 'Create an investigation checklist for unusual activity.',
  },
];

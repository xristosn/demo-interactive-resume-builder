import type { Resume } from './resume-data';

export interface TemplateConfig {
  id: string;
  component: React.FC<Resume>;
  disabled?: { image?: boolean };
}

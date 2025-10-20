import type { TemplateConfig } from '@/models/interfaces/template-config';

import { Template1 } from '@/components/templates/template-1';
import { Template2 } from '@/components/templates/template-2';
import { Template3 } from '@/components/templates/template-3';
import { Template4 } from '@/components/templates/template-4';
import { Template5 } from '@/components/templates/template-5';
import { Template6 } from '@/components/templates/template-6';

export const TEMPLATES_CONFIG: TemplateConfig[] = [
  {
    id: '1',
    component: Template1,
  },
  {
    id: '2',
    component: Template2,
  },
  {
    id: '3',
    component: Template3,
  },
  {
    id: '4',
    component: Template4,
    disabled: { image: true },
  },
  {
    id: '5',
    component: Template5,
    disabled: { image: true },
  },
  {
    id: '6',
    component: Template6,
  },
];

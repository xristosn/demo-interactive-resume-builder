import { createBrowserRouter } from 'react-router';

import { TemplatesList } from './templates-list';
import { TemplatePreview } from './template-preview';
import { CreateResume } from './resume-builder';

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    Component: TemplatesList,
  },
  {
    path: '/template-preview',
    Component: TemplatePreview,
  },
  {
    path: '/builder',
    Component: CreateResume,
  },
]);

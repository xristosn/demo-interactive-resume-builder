import { createRoot } from 'react-dom/client';
import React from 'react';

import { RouterProvider } from 'react-router';

import { ROUTER } from './routes/router';
import { Provider } from './components/ui/provider';
import { Toaster } from './components/ui/toaster';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider defaultTheme='light'>
      <Toaster />

      <RouterProvider router={ROUTER} />
    </Provider>
  </React.StrictMode>
);

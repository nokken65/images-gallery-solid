import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-solid';
import { JSX } from 'solid-js';

export const withRouter =
  (router: ReturnType<typeof createHistoryRouter>) =>
  (component: () => JSX.Element) =>
  () =>
    <RouterProvider router={router}>{component()}</RouterProvider>;

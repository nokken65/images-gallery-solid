import { Link, Route } from 'atomic-router-solid';
import { lazy, ParentComponent, Suspense } from 'solid-js';

import { DarkModeToggler } from '@/features/toggleDarkMode';
import { homeRoute } from '@/shared/config/routes';
import { GoUp } from '@/widgets/GoUp';

const HomePage = lazy(async () => import('./HomePage'));

const Layout: ParentComponent = (props) => {
  return (
    <>
      <header class='h-16 w-full flex justify-between items-center px-4 lg:px-2'>
        <Link to={homeRoute}>
          <h1 class='font-bold'>Gallery Solid</h1>
        </Link>
        <DarkModeToggler />
      </header>
      <main class='flex grow w-full min-h-full items-start justify-center p-4 lg:px-0'>
        {props.children}
      </main>
      <GoUp />
    </>
  );
};

export const Routing = () => {
  return (
    <Layout>
      <Suspense fallback='Loading...'>
        <Route route={homeRoute} view={HomePage} />
      </Suspense>
    </Layout>
  );
};

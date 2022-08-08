import './index.scss';

import { Routing } from '@/pages';
import { router } from '@/shared/libs/atomic-router';

import { withProviders } from './providers';

const AppView = () => {
  return <Routing />;
};

export const App = withProviders({ router })(AppView);

import { createRoute } from 'atomic-router';

export const homeRoute = createRoute();
export const signInRoute = createRoute();
export const signUpRoute = createRoute();
export const notFoundRoute = createRoute();

export const publicRoutes = [
  { path: '/', route: homeRoute },
  { path: '/signin', route: signInRoute },
  { path: '/signup', route: signUpRoute },
  { path: '/404', route: notFoundRoute },
];

export const privateRoutes = [];

export const routes = [...publicRoutes, ...privateRoutes];

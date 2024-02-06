import {
    Router, Route, RootRoute, Outlet,
} from '@tanstack/react-router';
import React from 'react';
import {Layout} from "../components/global/layout/Layout";
import {Main} from "../components/pages/main/Main";
import {Form} from "../components/global/form/Form";
import {Login} from "../components/pages/login/Login";
import {Registration} from "../components/pages/registration/Registration";

const rootRoute = new RootRoute({
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <Main />,
});


const authRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'auth',
    component: () => <Form />,
});

const loginRoute = new Route({
    getParentRoute: () => authRoute,
    path: 'login',
    component: () => <Login />,

});

const registrationRoute = new Route({
    getParentRoute: () => authRoute,
    path: 'registration',
    component: () => <Registration />,
});


const routeTree = rootRoute.addChildren([
    indexRoute.addChildren([
        authRoute.addChildren([
            loginRoute,
            registrationRoute,
        ]),
    ]),
]);

export const router = new Router({
    routeTree,
    defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

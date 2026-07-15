import React from 'react'
import { createBrowserRouter } from "react-router";
import Dashboard from '../pages/Dashboard';
import Registration from '../pages/Registration';
import LoginPage from '../pages/LoginPage';
import Protected from '../components/Protected';
import Interview from '../pages/Interview';
import InterviewPlans from '../components/InterviewPlans';

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <Registration />
    },
    {
        path: "/",
        element: <Protected><Dashboard /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    },
    {
        path:"/all-interviews",
        element: <Protected><InterviewPlans /></Protected>
    }
])

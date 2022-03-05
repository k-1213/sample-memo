import React, { VFC } from 'react'
import { Route, Routes } from "react-router-dom"

import { Main } from '../components/pages/Main'
import { Login } from '../components/pages/Login'
import { PrivateRouteWrapper } from './PrivateRouteWrapper'
import { PublicRouteWrapper } from './PublicRouteWrapper'

export const Router: VFC = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRouteWrapper>
                            <Login />
                        </PublicRouteWrapper>
                    } />
                <Route
                    path="/main"
                    element={
                        <PrivateRouteWrapper>
                            <Main />
                        </PrivateRouteWrapper>
                    } />
                <Route
                    path="*"
                    element={
                        <PublicRouteWrapper>
                            <Login />
                        </PublicRouteWrapper>
                    } />
            </Routes>
        </>
    )
}

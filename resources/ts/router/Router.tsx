import React, { VFC } from 'react'
import { Route, Routes } from "react-router-dom"

import { Main } from '../components/pages/Main'
import { Login } from '../components/pages/Login'
import { DefaultTemplete } from '../components/templetes/DefaultTemplete'

export const Router: VFC = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultTemplete>
                            <Login />
                        </DefaultTemplete>
                    } />
                <Route
                    path="/main"
                    element={
                        <DefaultTemplete>
                            <Main />
                        </DefaultTemplete>
                    } />
                <Route
                    path="*"
                    element={
                        <DefaultTemplete>
                            <Login />
                        </DefaultTemplete>
                    } />
            </Routes>
        </>
    )
}

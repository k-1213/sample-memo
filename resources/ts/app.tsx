import React, { VFC } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { Router } from './router/Router';
import { LoginProvider } from './provider/LoginProvider';

const App: VFC = () => {
    return (
        <ChakraProvider>
            <LoginProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </LoginProvider>
        </ChakraProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

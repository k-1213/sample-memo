import React, { ReactNode, VFC } from 'react'

import { Footer } from '../molecules/layout/Footer';
import { Header } from '../molecules/layout/Header';

export const DefaultTemplete: VFC<{ children: ReactNode }> = (props) => {

    const { children } = props;

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
};

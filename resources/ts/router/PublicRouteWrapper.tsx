import React, { memo, ReactNode, VFC } from 'react';

import { DefaultTemplete } from '../components/templetes/DefaultTemplete';

export const PublicRouteWrapper: VFC<{ children: ReactNode }> = memo((props) => {

    const { children } = props;

    return (
        <DefaultTemplete>
            {children}
        </DefaultTemplete>
    )
})

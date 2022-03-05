import React, { memo, ReactNode, VFC, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { DefaultTemplete } from '../components/templetes/DefaultTemplete';
import { useAxios } from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';

export const PrivateRouteWrapper: VFC<{ children: ReactNode }> = memo((props) => {

    // prop
    const { children } = props;
    // state
    const [ChildrenNode, setChildrenNode] = useState<JSX.Element>();
    // hooks
    const { getToken } = useAuth();
    const { axiosWithAuth } = useAxios();
    // common header
    axiosWithAuth(getToken());

    useEffect(() => {
        axios.get('/api/check')
            // success
            .then(() => setChildrenNode(<>{children}</>))
            // fail
            .catch(() => setChildrenNode(<Navigate to="/" />))
    }, [children])

    return (
        <>
            {ChildrenNode && (
                <DefaultTemplete>
                    {ChildrenNode}
                </DefaultTemplete>
            )}
        </>
    )
})

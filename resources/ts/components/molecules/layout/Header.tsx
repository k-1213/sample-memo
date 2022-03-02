import React, { memo, useContext, VFC } from "react";
import { Box, Heading, Flex, Spacer, Link } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import { LoginUserContext } from "../../../provider/LoginProvider";
import { useAuth } from '../../../hooks/useAuth';

export const Header: VFC = memo(() => {

    // hooks
    const { logout, isLogin } = useAuth();
    const navigate = useNavigate();

    // context
    const { loginUser } = useContext(LoginUserContext);

    // function
    const onClickTitle = (e: any) => {
        e.preventDefault();

        (!isLogin()) ?
            navigate('/') :
            location.href = '/main';
    };

    return (
        <Flex py={5} pl={2} bg='gray.50'>
            <Box as="a" href="*" onClick={onClickTitle} _hover={{ opacity: 0.6 }}>
                <Heading size='md' pl={5} color='gray.800'>メモ管理アプリ</Heading>
            </Box>
            <Spacer />
            <Flex align="center" pr={10}>
                {loginUser === null ?
                    (<Link onClick={() => navigate('/')}>ログイン</Link>) :
                    (<Link onClick={logout}>ログアウト</Link>)}
            </Flex>
        </Flex>
    )
});

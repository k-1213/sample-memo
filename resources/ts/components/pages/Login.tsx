import { Box, Button, Flex, Image, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState, VFC, useEffect } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Title } from '../atoms/card/Title';
import Logo from './img/logo.png';
import styled from '@emotion/styled'

export const Login: VFC = () => {

    // states
    const [inputLoginId, setInputLoginId] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    // hooks
    const { login, loading } = useAuth();

    // function
    const onClickLogin = () => login(inputLoginId, inputPassword);
    const onChangeInputUserId = (e: any) => setInputLoginId(e.target.value);
    const onChangeInputPassword = (e: any) => setInputPassword(e.target.value);

    // css
    const EImage = styled(Image)`
    animation:2s linear infinite rotate_animation;

    @keyframes rotate_animation{
        0%{ transform:rotateY(0);}
        100%{ transform:rotateY(360deg); }
    }
    `;

    // サンプルのため初期値設定
    useEffect(() => {
        setInputLoginId('test01');
        setInputPassword('test01');
    }, []);

    return (
        <Flex
            justify='center'
            align='center'
            h='calc(100vh - (64px + 43px + 5px))'>
            <Box border='1px' borderColor='gray.200' borderRadius='md'>
                <Title>
                    <Flex align='center' justify='center' w='100%'>
                        <EImage src={Logo} alt='logo' boxSize='30px' mr={1} />
                        <Text fontWeight='bold'>
                            メモ管理アプリ
                        </Text>
                    </Flex>
                </Title>
                <Box p={2}>
                    <Stack as='form' align='center' spacing={3} px={4} pt={5} pb={2}>
                        <Input
                            w='xs'
                            placeholder="ユーザーID"
                            onChange={onChangeInputUserId}
                            autoComplete="off"
                            value={inputLoginId} />
                        <Input
                            w='xs'
                            type='password'
                            onChange={onChangeInputPassword}
                            autoComplete="off"
                            value={inputPassword} />
                        <Button
                            w='50%'
                            isLoading={loading}
                            disabled={loading || (inputLoginId === '' || inputPassword === '')}
                            colorScheme='teal'
                            onClick={onClickLogin}>ログイン</Button>
                    </Stack>
                </Box>
            </Box>
        </Flex>
    );
};

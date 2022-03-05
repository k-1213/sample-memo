import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState, VFC, useEffect } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Title } from '../atoms/card/Title';

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
                    <Text fontWeight='bold' align='center' w='100%'>メモ管理アプリ</Text>
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

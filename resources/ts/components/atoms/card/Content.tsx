import { Text } from '@chakra-ui/react';
import React, { memo, ReactNode, VFC } from "react";

export const Content: VFC<{ children: ReactNode }> = memo((props) => {

    const { children } = props;

    return (
        <Text p="2">
            {children}
        </Text>
    )
});

import { Flex } from "@chakra-ui/react";
import React, { memo, ReactNode, VFC } from "react";

export const Title: VFC<{ children: ReactNode }> = memo((props) => {

    const { children } = props;

    return (
        <Flex
            as="h5"
            py={3}
            px={2}
            bg='gray.200'
            justify='space-between'
            boxShadow='md'
            color="gray.800">
            {children}
        </Flex>
    )
});

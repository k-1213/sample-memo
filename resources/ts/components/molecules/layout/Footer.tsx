import React, { memo, VFC } from "react";
import { Flex, Text } from "@chakra-ui/react";

export const Footer: VFC = memo(() => {

    return (
        <Flex py={3} pl={2} bg='gray.50' justify='center'>
            <Text fontStyle='italic'>&copy; 2022 k-kato </Text>
        </Flex>
    )
});

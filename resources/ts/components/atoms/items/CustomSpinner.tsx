import React, { VFC } from "react";
import { Center, Spinner } from "@chakra-ui/react"

export const CustomSpinner: VFC<{ color: string }> = (props) => {

    const { color } = props;

    return (
        <Center pt={5}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color={color}
                size='xl'
            />
        </Center>
    )
}

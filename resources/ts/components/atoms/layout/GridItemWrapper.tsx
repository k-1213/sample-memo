
import { GridItem } from "@chakra-ui/react";
import React, { memo, ReactNode, VFC } from "react";

type Props = {
    children: ReactNode;
    colSpan: number;
}

export const GridItemWrapper: VFC<Props> = memo((props) => {

    const { children, colSpan } = props;

    return (
        <GridItem
            colSpan={{ base: 6, md: colSpan }}
            h='calc(100vh - (64px + 43px + 5px))'
            border="1px"
            borderColor='gray.200'>
            {children}
        </GridItem>
    )
});

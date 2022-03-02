import { Box } from "@chakra-ui/react";
import React, { ReactNode, memo, VFC } from "react";

type Props = {
    id: number;
    onClick: any;
    children: string;
    selectedId?: number;
}

export const ContentBaseRow: VFC<Props> = memo((props) => {
    const { id, onClick, children, selectedId } = props;
    return (
        <Box
            as="a"
            href="*"
            display="block"
            mb={1}
            onClick={(e: any) => onClick(e, id)}
            p={1}
            backgroundColor={selectedId === id ? 'gray.100' : ''}
            _hover={{ backgroundColor: 'gray.100' }}>
            {children}
        </Box>
    );
});

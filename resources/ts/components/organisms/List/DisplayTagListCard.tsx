import { Box, Center } from "@chakra-ui/react";
import React, { ReactNode, memo, VFC } from "react";

import { Title } from '../../atoms/card/Title';
import { Content } from '../../atoms/card/Content';
import { MemoType } from "../../../type/MemoType";
import { TagType } from "../../../type/TagType";
import { ContentBaseRow } from '../../atoms/card/ContentBaseRow';
import { CustomSpinner } from '../../atoms/items/CustomSpinner';

type Props = {
    children: ReactNode;
    items: Array<MemoType> | Array<TagType>;
    onClick: (e: any, id: number) => void;
    selectedTagId: number;
    isTagLoading: boolean;
}

export const DisplayTagListCard: VFC<Props> = memo((props) => {

    const {
        children,
        items,
        onClick,
        selectedTagId,
        isTagLoading
    } = props;

    return (
        <Box>
            <Title>
                {children}
            </Title>
            {isTagLoading ? (
                <Center pt={5}>
                    <CustomSpinner color='blue.500' />
                </Center>
            ) : (
                <Content>
                    <ContentBaseRow
                        id={0}
                        selectedId={selectedTagId}
                        onClick={(e: any) => onClick(e, 0)}>
                        全て表示
                    </ContentBaseRow>
                    {items.map((item) => (
                        <ContentBaseRow
                            key={item.id}
                            id={item.id}
                            selectedId={selectedTagId}
                            onClick={(e: any) => onClick(e, item.id)}>
                            {item.content}
                        </ContentBaseRow>
                    ))}
                </Content>
            )}
        </Box >
    )
});

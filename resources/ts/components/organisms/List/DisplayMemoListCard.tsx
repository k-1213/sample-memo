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
    selectedMemoId: number;
    onClickSwitchCreateMode: () => void;
    isMemoLoading: boolean;
}

export const DisplayMemoListCard: VFC<Props> = memo((props) => {

    const {
        children,
        items,
        onClick,
        selectedMemoId,
        onClickSwitchCreateMode,
        isMemoLoading } = props;

    return (
        <Box>
            <Title>
                {children}
                <Box
                    className='material-icons'
                    _hover={{ cursor: 'pointer', opacity: 0.6 }}
                    pr={3}
                    onClick={onClickSwitchCreateMode}>
                    control_point
                </Box>
            </Title>

            {isMemoLoading ? (
                <Center pt={5}>
                    <CustomSpinner color='red.500' />
                </Center>
            ) : (
                <Content>
                    {items.map((item) => (
                        <ContentBaseRow
                            key={item.id}
                            id={item.id}
                            selectedId={selectedMemoId}
                            onClick={(e: any) => onClick(e, item.id)}>
                            {item.content}
                        </ContentBaseRow>
                    ))}
                </Content>
            )}
        </Box>
    )
});

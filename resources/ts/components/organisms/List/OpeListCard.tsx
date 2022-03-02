import { Box, Input, Textarea, Button, Checkbox, Flex, Center } from "@chakra-ui/react";
import React, { memo, VFC, useState, useEffect } from "react";

import { MemoType } from "../../../type/MemoType";
import { TagType } from "../../../type/TagType";
import { Title } from '../../atoms/card/Title';
import { CustomSpinner } from "../../atoms/items/CustomSpinner";

type Props = {
    onClickDelete: () => void;
    onClickOperate: (content: string, newTagName: string, checkedTagItems: Array<number>, memo_id: number, isEdit: boolean) => void;
    created: boolean;
    tags: Array<TagType>;
    selectedMemoInfo: Array<MemoType>;
    isOpeLoading: boolean;
}

export const OpeListCard: VFC<Props> = memo((props) => {

    // props
    const {
        onClickDelete,
        onClickOperate,
        created,
        tags,
        selectedMemoInfo,
        isOpeLoading } = props;

    // states
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [memoId, setMemoId] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [newTagName, setNewTagName] = useState<string>('');
    const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

    // functions
    const init = () => {
        setIsEdit(false);
        setContent('');
        setNewTagName('');
        setCheckedItems([]);
    }
    const onChangeContent = (event: any) => setContent(event.target.value);
    const onChangeNewTagName = (event: any) => setNewTagName(event.target.value);
    const onChangeCheckBoxTags = (event: any, tag_id: number) => {
        event.target.checked ?
            setCheckedItems([...checkedItems, tag_id]) :
            setCheckedItems(checkedItems.filter(item => (item !== tag_id)));
    }

    // メモ作成完了
    useEffect(() => init(), [created]);

    // メモ選択
    useEffect(() => {

        if (selectedMemoInfo.length > 0) {

            // 編集モードに切り替え
            setIsEdit(true);

            // 選択されたメモ情報で初期化
            setMemoId(selectedMemoInfo[0].id);
            setContent(selectedMemoInfo[0].content);
            const tag_ids = selectedMemoInfo.map((memo) => memo.tag_id);
            (tag_ids[0] !== null) ?
                setCheckedItems(tag_ids) :
                setCheckedItems([]);

        } else {

            init();
        }
    }, [selectedMemoInfo]);

    return (
        <Box>
            <Title>
                {!isEdit ? 'メモ作成' : (
                    <>
                        メモ編集
                        <Box
                            className='material-icons'
                            _hover={{ cursor: 'pointer', opacity: .6 }}
                            pr={3}
                            onClick={onClickDelete}>
                            delete
                        </Box>
                    </>)}
            </Title>
            {isOpeLoading ? (
                <Center pt={5}>
                    <CustomSpinner color='green.500' />
                </Center>
            ) : (
                <Box p={2}>
                    <Textarea
                        value={content}
                        onChange={onChangeContent}
                        placeholder='メモ内容を入力してください'
                        size='sm'
                        rows={5}
                        mb={2}
                        p={3}
                    />
                    <Flex
                        direction='row'
                        flexWrap='wrap'
                        mb={2}>
                        {tags.map((tag) => (
                            <Checkbox
                                value={tag.id}
                                key={tag.id}
                                isChecked={checkedItems.find((e) => e === tag.id) ? true : false}
                                mr={4}
                                colorScheme='green'
                                onChange={(e) => onChangeCheckBoxTags(e, tag.id)}>
                                {tag.content}
                            </Checkbox>
                        ))}
                    </Flex>
                    <Input
                        value={newTagName}
                        onChange={onChangeNewTagName}
                        mb={2}
                        p={3}
                        w='50%'
                        placeholder='タグ名を入力'
                        size='sm' />
                    <Button
                        boxShadow='md'
                        display='block'
                        colorScheme='teal'
                        onClick={() => onClickOperate(content, newTagName, checkedItems, memoId, isEdit)}>
                        {isEdit ? '更新' : '作成'}
                    </Button>
                </Box>
            )}
        </Box>
    )
});

import React, { memo, useContext, useEffect, VFC } from "react";
import { Grid } from '@chakra-ui/react';

import { GridItemWrapper } from "../atoms/layout/GridItemWrapper";
import { useOperateData } from '../../hooks/useOperateData';
import { OpeListCard } from '../organisms/List/OpeListCard';
import { DisplayTagListCard } from '../organisms/List/DisplayTagListCard';
import { DisplayMemoListCard } from '../organisms/List/DisplayMemoListCard';
import { useAuth } from '../../hooks/useAuth';
import { CustomAlertDialog } from '../atoms/items/CustomAlertDialog';
import { useAlertDialog } from "../../hooks/useAlertDialog";

export const Main: VFC = memo(() => {

    // hooks
    const {
        getAllMemos,
        insertMemo,
        memos,
        created,
        getAllTags,
        tags,
        selectMemo,
        selectedMemoInfo,
        updateMemo,
        selectTag,
        selectedTagId,
        selectedMemoId,
        deleteMemo,
        switchCreateMode,
        isTagLoading,
        isMemoLoading,
        isOpeLoading
    } = useOperateData();
    const { checkLogin } = useAuth();
    const { isOpen,
        onOpenDialog,
        onCloseDialog,
        message,
        setMessage } = useAlertDialog();

    // functions
    const onClickTag = (e: any, tag_id: number) => {
        e.preventDefault();

        selectTag(tag_id);
    }
    const onClickMemo = (e: any, memo_id: number) => {
        e.preventDefault();

        selectMemo(memo_id);
    }
    const onClickOperateMemo = (
        content: string,
        newTagName: string,
        checkedTagItems: Array<number>,
        memo_id: number,
        isEdit: boolean) => {

        if (isEdit) {

            // 編集
            if (updateMemo(memo_id, content, newTagName, checkedTagItems)) {

                selectMemo(memo_id);
                selectTag(selectedTagId);
            }
        } else {
            // 作成
            insertMemo(content, newTagName, checkedTagItems);
        }
    }
    const onClickSwitchCreateMode = () => switchCreateMode();
    const onClickDelete = () => {
        setMessage('編集中のメモを削除しますか？');
        onOpenDialog();
    };
    const onCloseDeleteDialog = (isYes: boolean) => {
        onCloseDialog(() => {

            // Yesの場合は削除
            if (isYes) {
                deleteMemo(selectedMemoId);

                selectMemo(selectedMemoId);
                selectTag(selectedTagId);
            }
        });
    }

    // 初回 or メモ作成完了
    useEffect(() => {

        if (checkLogin()) {

            // 初期データ取得
            getAllTags();
            (selectedTagId === 0) ?
                getAllMemos() :
                selectTag(selectedTagId);
        }

    }, [created]);

    return (
        <>
            <Grid templateColumns='repeat(6, 1fr)'>
                <GridItemWrapper colSpan={1}>
                    <DisplayTagListCard
                        items={tags}
                        selectedTagId={selectedTagId}
                        onClick={onClickTag}
                        isTagLoading={isTagLoading} >
                        タグ一覧
                    </DisplayTagListCard>
                </GridItemWrapper>
                <GridItemWrapper colSpan={2}>
                    <DisplayMemoListCard
                        onClickSwitchCreateMode={onClickSwitchCreateMode}
                        items={memos}
                        selectedMemoId={selectedMemoId}
                        onClick={onClickMemo}
                        isMemoLoading={isMemoLoading} >
                        メモ一覧
                    </DisplayMemoListCard>
                </GridItemWrapper>
                <GridItemWrapper colSpan={3}>
                    <OpeListCard
                        onClickDelete={onClickDelete}
                        onClickOperate={onClickOperateMemo}
                        created={created}
                        tags={tags}
                        selectedMemoInfo={selectedMemoInfo}
                        isOpeLoading={isOpeLoading} />
                </GridItemWrapper>
            </Grid>

            <CustomAlertDialog
                confirmMessage={message}
                isOpen={isOpen}
                onClose={onCloseDeleteDialog} />
        </>
    );
});

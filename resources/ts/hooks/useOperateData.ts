import axios from "axios";
import {  useState } from "react";

import { MemoType } from "../type/MemoType";
import { TagType } from "../type/TagType";
import { useMessage } from './useMessage';
import { useAuth } from './useAuth';

export const useOperateData = () => {

    // context
    const { getUserId } = useAuth();

    // states
    const [tags, setTags] = useState<Array<TagType>>([]);
    const [memos, setMemos] = useState<Array<MemoType>>([]);
    const [created, setCreated] = useState<boolean>(false);
    const [selectedTagId, setSelectedTagId] = useState<number>(0);
    const [selectedMemoId, setSelectedMemoId] = useState<number>(0);
    const [selectedMemoInfo, setSelectedMemoInfo] = useState<Array<MemoType>>([]);
    const [isTagLoading, setIsTagLoading] = useState<boolean>(false);
    const [isMemoLoading, setIsMemoLoading] = useState<boolean>(false);
    const [isOpeLoading, setIsOpeLoading] = useState<boolean>(false);

    // hook
    const { showMessage } = useMessage();

    // functions
    // メモ全件取得
    const getAllMemos = () => {
        setIsMemoLoading(true);

        axios.get<{ data: Array<MemoType> }>(`/api/getmemos/?user_id=${getUserId()}`)
            // success
            .then((res) => {
                setMemos(res.data.data);
            })
            // fail
            .catch((e) => {
                console.error(e);
            }).finally(() => {
                setIsMemoLoading(false);
            });
    };
    // タグ全件取得
    const getAllTags = () => {
        setIsTagLoading(true);

        axios.get<{ data: Array<TagType> }>(`/api/gettags?user_id=${getUserId()}`)
            // success
            .then((res) => {
                setTags(res.data.data);
            })
            // fail
            .catch((e) => {
                console.error(e);
            }).finally(() => {
                setIsTagLoading(false);
            });
    };
    // メモ・タグ登録
    const insertMemo = (
        content: string,
        newTagName: string,
        checkedTagItems: Array<number>) => {

        setCreated(false);

        // validate
        if (!content && !newTagName) {
            showMessage({ str: 'メモ内容またはタグ名のいずれかを設定してください！', status: 'warning' });
            return false;
        }
        setIsOpeLoading(true);

        // data
        const data = {
            content,
            newTagName,
            checkedTagItems,
            user_id: getUserId()
        };

        axios.post('/api/create', data)
            // success
            .then((res) => {
                // success
                if (res.data) {
                    setCreated(true);
                    showMessage({ str: 'メモを登録しました！', status: 'success' });
                }
                // fail
                else {
                    showMessage({ str: 'メモの登録に失敗しました…', status: 'error' });
                }
            })
            .catch((e) => {
                // fail
                showMessage({ str: 'メモの登録に失敗しました…', status: 'error' });
            }).finally(() => {
                setIsOpeLoading(false);
            });
    };
    //タグ選択
    const selectTag = (tag_id: number) => {
        setIsMemoLoading(true);

        // タグの指定有無で場合分け
        const url = (tag_id !== 0) ?
            `/api/getMemosByTagId/?user_id=${getUserId() }&tag_id=${tag_id}` :
            `/api/getmemos/?user_id=${getUserId()}`;
        axios.get<{ data: Array<MemoType> }>(url)
            // success
            .then((res) => {
                setSelectedTagId(tag_id);
                setMemos(res.data.data);
            })
            // fail
            .catch((e) => {
                console.error(e);
            }).finally(() => {
                setIsMemoLoading(false);
            });
    };
    //メモ選択
    const selectMemo = (memo_id: number) => {
        setIsOpeLoading(true);

        // メモIdに紐づくタグ一覧の取得
        axios.get<{ data: Array<MemoType> }>(`/api/getSelectedMemo/?user_id=${getUserId()}&memo_id=${memo_id}`)
            // success
            .then((res) => {
                setSelectedMemoId(memo_id);
                setSelectedMemoInfo(res.data.data);
            })
            // fail
            .catch((e) => {
                console.error(e);
            }).finally(() => {
                setIsOpeLoading(false);
            });
    };
    // メモ更新
    const updateMemo = (
        memo_id: number,
        content: string,
        newTagName: string,
        checkedTagItems: Array<number>) => {

        setCreated(false);

        // validate
        if (!content) {
            showMessage({ str: 'メモ内容を設定してください！', status: 'warning' });
            return false;
        }
        setIsOpeLoading(true);

        // data
        const data = {
            content,
            newTagName,
            checkedTagItems,
            user_id: getUserId(),
            memo_id
        };

        axios.post('/api/update', data)
            // success
            .then((res) => {
                // success
                if (res.data) {
                    setCreated(true);
                    showMessage({ str: 'メモを更新しました！', status: 'success' });
                }
                // fail
                else {
                    showMessage({ str: 'メモの更新に失敗しました…', status: 'error' });
                }
            })
            .catch((e) => {
                // fail
                showMessage({ str: 'メモの更新に失敗しました…', status: 'error' });
            }).finally(() => {
                setIsOpeLoading(false);
            });

        return true;
    }
    // メモ削除
    const deleteMemo = (memo_id: number) => {

        setCreated(false);
        setIsOpeLoading(true);

        // data
        const data = {
            user_id: getUserId(),
            memo_id
        };

        axios.post('/api/destroy', data)
            // success
            .then((res) => {
                // success
                if (res.data) {
                    setCreated(true);
                    showMessage({ str: 'メモを削除しました！', status: 'success' });
                }
                // fail
                else {
                    showMessage({ str: 'メモの削除に失敗しました…', status: 'error' });
                }
            })
            .catch((e) => {
                // fail
                showMessage({ str: 'メモの削除に失敗しました…', status: 'error' });
            }).finally(() => {
                setIsOpeLoading(false);
            });

    }
    // メモ作成モードに切り替え
    const switchCreateMode = () => {

        setSelectedMemoInfo([]);
        setSelectedTagId(0);
        setSelectedMemoId(0);
        getAllMemos();
        getAllTags();
    }

    return {
        getAllMemos,
        memos,
        insertMemo,
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
    }
}

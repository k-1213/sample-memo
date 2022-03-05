import axios from "axios";
import { useState } from "react";

import { MemoType } from "../type/MemoType";
import { TagType } from "../type/TagType";
import { useMessage } from './useMessage';
import { useAuth } from './useAuth';
import { useAxios } from "./useAxios";

export const useOperateData = () => {

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

    // hooks
    const { showMessage } = useMessage();
    const { getToken } = useAuth();
    const { axiosWithAuth } = useAxios();
    // common header
    axiosWithAuth(getToken());

    // functions
    // get all memos
    const getAllMemos = () => {
        setIsMemoLoading(true);

        axios.get<{ data: Array<MemoType> }>('/api/getmemos')
            // success
            .then((res) => setMemos(res.data.data))
            // fail
            .catch((e) => {
                console.error(e);
            }).finally(() => {
                setIsMemoLoading(false);
            });
    };
    // get all tags
    const getAllTags = () => {
        setIsTagLoading(true);

        axios.get<{ data: Array<TagType> }>('/api/gettags')
            // success
            .then((res) => setTags(res.data.data))
            // fail
            .catch((e) => {
                console.error(e);
            }).finally(() => {
                setIsTagLoading(false);
            });
    };
    // create
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
            checkedTagItems
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
    // update
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
    // destroy
    const deleteMemo = (memo_id: number) => {

        setCreated(false);
        setIsOpeLoading(true);

        // data
        const data = {
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

    };
    // select tag
    const selectTag = (tag_id: number) => {
        setIsMemoLoading(true);

        // divide by cases
        const url = (tag_id !== 0) ?
            `/api/getMemosByTagId/?tag_id=${tag_id}` : '/api/getmemos';
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
    // select memo
    const selectMemo = (memo_id: number) => {
        setIsOpeLoading(true);

        // get tag_list by memoId
        axios.get<{ data: Array<MemoType> }>(`/api/getSelectedMemo/?memo_id=${memo_id}`)
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
    // create mode
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

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';

import { UserType } from "../type/UserType";
import { useMessage } from './useMessage';
import { LoginUserContext } from '../provider/LoginProvider';

export const useAuth = () => {

    // hooks
    const navigate = useNavigate();
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState<boolean>();
    const { loginUser, setLoginUser } = useContext(LoginUserContext);

    // functions
    // ログイン
    const login = (loginId: string, password: string) => {
        setLoading(true);

        const data = {
            loginId,
            password
        }

        axios.post<{ data: Array<UserType> }>('/api/login', data)
            // success
            .then((res) => {

                // success
                if (res.data.data) {

                    // user
                    const user = res.data.data[0];
                    // store
                    setLoginUser(user);

                    // とりあえずsessionStorageに保存
                    // # TODO: 認証回り後でどうにかする
                    sessionStorage.clear();
                    sessionStorage['login_info'] = JSON.stringify(user);

                    showMessage({ status: 'success', str: `ようこそ、${user.name}さん！` });
                    setLoading(false);

                    // 遷移
                    navigate('main');
                } else {
                    setLoading(false);

                    showMessage({ status: 'error', str: `ユーザーIDまたはパスワードが誤っています。` });
                }
            })
            // fail
            .catch(() => {

                setLoading(false);
                showMessage({ status: 'error', str: `ユーザーIDまたはパスワードが誤っています。` });
            })
    }
    // ログアウト
    const logout = () => {

        // ユーザー情報削除
        setLoginUser(null);
        sessionStorage.clear();

        showMessage({ status: 'info', str: `ログアウトしました。` });
        navigate('/');
        return false;
    }
    // ログインチェック
    const checkLogin = () => {

        if (!isLogin()) {
            navigate('/');
            return false;
        }
        return true;
    }
    // ログイン有無チェック
    const isLogin = () => {

        // context
        if (loginUser) {
            return true;
        } else {
            // contextから取得不可の場合はsessionStrageから取得
            const userState = sessionStorage.getItem('login_info');
            if (userState) {
                setLoginUser(JSON.parse(userState));
                return true;
            }
        }
        return false;
    }
    // ユーザーId取得
    const getUserId = () => {

        if (loginUser) {
            return loginUser.id;
        } else {
            return (JSON.parse(sessionStorage.getItem('login_info') !)).id;
        }
    }

    return {
        login,
        logout,
        loading,
        checkLogin,
        isLogin,
        getUserId
    };
}

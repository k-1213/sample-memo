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
    // login
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
                    sessionStorage.removeItem('auth_token');
                    sessionStorage['auth_token'] = JSON.stringify(user.token);

                    showMessage({ status: 'success', str: `ようこそ、${user.name}さん！` });
                    setLoading(false);

                    navigate('main');

                    // fail
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
    // logout
    const logout = () => {

        // delete
        setLoginUser(null);
        sessionStorage.removeItem('auth_token');

        showMessage({ status: 'info', str: `ログアウトしました。` });
        navigate('/');
        return false;
    }
    // get token
    const getToken = () => {

        if (loginUser) {
            return loginUser.token;
        } else {
            const tokenState = sessionStorage.getItem('auth_token');
            if (tokenState) {
                return JSON.parse(tokenState);
            }
        }

        return '';
    }

    return {
        login,
        logout,
        loading,
        getToken
    };
}

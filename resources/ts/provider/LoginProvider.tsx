import React, { createContext, useState, VFC, ReactNode, Dispatch, SetStateAction } from 'react';
import { UserType } from '../type/UserType';

type LoginUserType = {
    loginUser: UserType | null;
    setLoginUser: Dispatch<SetStateAction<UserType | null>>;
}

export const LoginUserContext = createContext<LoginUserType>({} as LoginUserType);
export const LoginProvider = (props: { children: ReactNode }) => {

    const [loginUser, setLoginUser] = useState<UserType | null>(null);
    const { children } = props;

    return (
        <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </LoginUserContext.Provider>
    )
}

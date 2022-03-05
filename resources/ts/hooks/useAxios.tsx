import axios from "axios";

export const useAxios = () => {

    // common header
    const axiosWithAuth = (token: string) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return { axiosWithAuth };
}

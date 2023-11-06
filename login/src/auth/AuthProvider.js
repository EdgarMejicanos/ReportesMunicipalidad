import Cookies from '../helpers/Cookies';
import axios from "axios";
import { base_url } from '../helpers/constants';

const provider = {

    saveSession: (session) => {

        Cookies.setCookie('session', JSON.stringify(session));
    },

    logout: () => {
        Cookies.deleteCookie('session');
        return Promise.resolve();
    },

    checkAuth: () => {
        return !!Cookies.getCookie('session');
    },

    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            Cookies.deleteCookie('session');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getRol: () => {
        const session = Cookies.getCookie('session');
        return session ? session.role.Identificador : "";
    },

    getRequestHeaders: () => {

        const  session = JSON.parse(Cookies.getCookie('session'));

        return {
            Authorization: `Bearer ${session.token}`
        }
    },
    getUsuario: () => {
        const session = JSON.parse(Cookies.getCookie("session"));
        return session.user;
    },
    getRol: () => {
        const session = JSON.parse(Cookies.getCookie("session"));
        return session.user.rol;
    },
    getMe: (token) => {
        return axios.get(`${base_url}/api/users/me?populate=rol`, {headers: {Authorization: `Bearer ${token}`}});
    }
}

export default provider;
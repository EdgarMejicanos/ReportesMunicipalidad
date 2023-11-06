import axios from "axios";
import authProvider from "../auth/AuthProvider";
import { base_url } from "./constants";

const api = {
    login: (creds) => {
        return axios.post(`${base_url}/api/auth/local`, {
            identifier: creds.email,
            password: creds.password
        });
    },
    register: (data) => {
        return axios.post(`${base_url}/api/auth/local/register`, data);
    },

    guardarReporte: (reporte) => {
        const authHeaders = authProvider.getRequestHeaders();
        const headers = {
            headers:{
                ...authHeaders,
                'Content-Type': 'multipart/form-data'
            }
        }
        return axios.post(`${base_url}/api/reportes`, reporte, headers);
    },
    actualizarEstado: (id, estado, comentario) => {
        const authHeaders = authProvider.getRequestHeaders();
        const headers = {
            headers:{
                ...authHeaders,
            }
        }
        return axios.put(`${base_url}/api/reportes/${id}`, {data:{Estado: estado, Comentario:comentario}}, headers);
    },
    getReportes: (estado) => {

        const authHeaders = authProvider.getRequestHeaders();
        if (estado) {
            return axios.get(`${base_url}/api/reportes?filters[Estado][$eq]=${estado}&populate=Fotografia`, {headers: authHeaders});
        } else {
            return axios.get(`${base_url}/api/reportes?populate=Fotografia`, {headers: authHeaders});
        }

        
    },

    getUserReportes: () => {
        const authHeaders = authProvider.getRequestHeaders();
        
        const usuario = authProvider.getUsuario();

        return axios.get(`${base_url}/api/reportes?filters[user]=${usuario.id}&populate=Fotografia`, {headers: authHeaders});
    }

}

export default api;
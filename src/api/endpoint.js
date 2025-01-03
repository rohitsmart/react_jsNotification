// const API_BASE_URL = "http://localhost:8080/api/"; 
const API_BASE_URL = "http://192.168.1.12:8080/api/"; 



export const LOGIN_ENDPOINT = `${API_BASE_URL}public/auth/login`;
export const notify = `${API_BASE_URL}public/notify/notifications`;
export const courtAdd = `${API_BASE_URL}private/court/create-or-update`;
export const courtFetch = `${API_BASE_URL}private/court/fetch`;
export const fetchSports = `${API_BASE_URL}private/sports/fetch`;
export const fetchUsersList = `${API_BASE_URL}protected/user/fetch-all`;

export const WEBSOCKET_CONNECTION = `${API_BASE_URL}public/ws`;

export const MESSAGE_TYPES = {
    PRIVATE: "private",
    GROUP: "group",
    SEEN: "seen"
};


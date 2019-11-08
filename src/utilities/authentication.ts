
export const fetchToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const setUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData) || '');
}

export const clearToken = () => {
    localStorage.clear()
}

export const isAuthenticated = () => {
    if(fetchToken()){
        return true;
    }
    return false;
}

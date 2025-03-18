export const checkAuthStatus = () => {
    const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));
    
    if (!franchiseInfo) return false;

    if (franchiseInfo.tokenExpiry && new Date(franchiseInfo.tokenExpiry) < new Date()) {
        localStorage.removeItem('franchiseInfo');
        delete axios.defaults.headers.common['Authorization'];
        return false;
    }

    return true;
};

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};
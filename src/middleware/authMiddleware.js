import { checkAuthStatus } from '../utils/auth';

export const requireAuth = (to, from, next) => {
    if (!checkAuthStatus()) {
        return '/franchise/login';
    }
    return next();
};
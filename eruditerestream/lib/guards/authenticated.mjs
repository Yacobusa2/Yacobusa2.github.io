import Auth from '../auth.mjs';

export default function authenticated (req, res, next) {
    try {
        const user = Auth.userFromRequest(req);
        if (!user)
            throw new Error('invalid_token');

        if (user.email !== process.env.ADMIN_EMAIL)
            throw new Error('not_so_erudite');

        req.user = user;
        next();

    } catch(e) {
        next(new Error('unauthorised'));
    }  
};
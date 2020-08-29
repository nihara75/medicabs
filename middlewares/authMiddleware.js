
module.exports = {

    authenticatedOnly : (req, res, next) => {
        // console.log(req.isAuthenticated());
        // console.log(req.user);
        if(req.isAuthenticated()) return next();
        res.send({ message: 'You are not logged in' });
    },

    unauthenticatedOnly: (req, res, next) => {
        if(!req.isAuthenticated()) return next();
        res.send({ success: false, message: 'You are logged in' });
    }
}
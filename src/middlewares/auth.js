const adminAuth = (req, res, next) => {
    const token = 'abc';
    const isTokenAuthorized = token === 'abc';
    if(!isTokenAuthorized) {
        res.status(401).send('Admin is not authorized');
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = 'abc';
    const isTokenAuthorized = token === 'abc';
    if(!isTokenAuthorized) {
        res.status(401).send('Admin is not authorized');
    } else {
        next();
    }
}

module.exports = {
    adminAuth, 
    userAuth
};
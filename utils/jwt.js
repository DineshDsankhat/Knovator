const {expressjwt} = require('express-jwt');
const config = require('../config.json');
const userService = require('../services/userService');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressjwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/authenticate',
            '/register'
        ]
    });
}

async function isRevoked(req, token) {
  const user = await userService.getById(token.payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return true
    }
   return false
};

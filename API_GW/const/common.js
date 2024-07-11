// Names of all the routes we have

const LOGIN = 'login';
const REGISTER = 'register';
const USERS = 'users';
const ADMINROUTE = 'admin';
const CONTENT ='content';
const NOTIFICATIONS = 'notifications'

exports.ADMIN_ROUTES = [
    USERS,
    ADMINROUTE,
    NOTIFICATIONS,
    CONTENT
]

exports.USER_ROUTES = [
    LOGIN,
    REGISTER,
    NOTIFICATIONS
]

exports.UNPROTECTED = [
    LOGIN,
    REGISTER,
    CONTENT
]

exports.ADMIN = 'ADMIN';
exports.USER = 'USER';

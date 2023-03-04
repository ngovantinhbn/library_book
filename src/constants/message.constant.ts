const NOT_EMPTY = 'cant not empty';
const LENGTH = 'must be length from 5 to 30 characters';

export const USER = {
    USERNAME_LENGTH: 'Username must be length from 5 to 30 characters',
    USER_NAME_NOT_EMPTY: 'Username' + NOT_EMPTY,
    PASSWORD_LENGTH: 'Password must be length from 5 to 30 characters',
    PASSWORD_NOT_EMPTY: 'Password cant not empty',
    FULLNAME_LENGTH: 'Fullname must be length from 5 to 30 characters',
};
export const AUTH = {
    USER_IS_EXISTED: 'Username is existed',
    LOGIN_FAIL: 'Login fail',
};
export const BOOK = {
    TITLE_LENGTH: 'Title' + LENGTH,
    AUTHOR_LENGTH: 'Author' + LENGTH,
    DESCRIBE: 'Describe' + LENGTH,
}
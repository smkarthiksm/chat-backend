import * as DatabaseConstants from './DatabaseConstants';
export const INSERT_USER = `INSERT INTO ${DatabaseConstants.USER_TABLE}
(${DatabaseConstants.FIRST_NAME},${DatabaseConstants.LAST_NAME},${DatabaseConstants.EMAIL},${DatabaseConstants.PHONE_NUMBER},${DatabaseConstants.GENDER},${DatabaseConstants.PASSWORD}) values(?,?,?,?,?,?)`;
export const FIND_BY_EMAIL = `SELECT * FROM ${DatabaseConstants.USER_TABLE} WHERE ${DatabaseConstants.EMAIL} = ?`;
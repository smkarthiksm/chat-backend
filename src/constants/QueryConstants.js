import * as DatabaseConstants from './DatabaseConstants';

export const INSERT_USER = `INSERT INTO ${DatabaseConstants.USER_TABLE}
(${DatabaseConstants.FIRST_NAME},${DatabaseConstants.LAST_NAME},${DatabaseConstants.EMAIL},${DatabaseConstants.PHONE_NUMBER}) values(?,?,?,?)`;
export const INSERT_PASSWORD = `INSERT INTO ${DatabaseConstants.USER_PASSWORD_TABLE}
(${DatabaseConstants.FK_USER_USERPASSWORD},${DatabaseConstants.PASSWORD}) values(?,?)`;
export const FIND_BY_EMAIL = `SELECT * FROM ${DatabaseConstants.USER_TABLE} WHERE ${DatabaseConstants.EMAIL} = ?`;
export const FIND_BY_EMAIL_AND_PASSWORD = `SELECT * FROM ${DatabaseConstants.USER_TABLE} INNER JOIN ${DatabaseConstants.USER_PASSWORD_TABLE} 
ON ${DatabaseConstants.USER_TABLE}.${DatabaseConstants.PK_USER} = ${DatabaseConstants.USER_PASSWORD_TABLE}.${DatabaseConstants.FK_USER_USERPASSWORD} 
AND ${DatabaseConstants.USER_TABLE}.${DatabaseConstants.EMAIL}=?`;
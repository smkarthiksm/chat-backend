import * as DatabaseConstants from './DatabaseConstants';

export const INSERT_USER = `INSERT INTO ${DatabaseConstants.USER_TABLE}
(${DatabaseConstants.FIRST_NAME},${DatabaseConstants.LAST_NAME},${DatabaseConstants.EMAIL},${DatabaseConstants.PHONE_NUMBER}) VALUES(?,?,?,?)`;

export const INSERT_PASSWORD = `INSERT INTO ${DatabaseConstants.USER_PASSWORD_TABLE}
(${DatabaseConstants.FK_USER_USERPASSWORD},${DatabaseConstants.PASSWORD}) VALUES(?,?)`;

export const FIND_BY_EMAIL = `SELECT * FROM ${DatabaseConstants.USER_TABLE} WHERE ${DatabaseConstants.EMAIL} = ?`;

export const FIND_BY_EMAIL_AND_PASSWORD = `SELECT * FROM ${DatabaseConstants.USER_TABLE} INNER JOIN ${DatabaseConstants.USER_PASSWORD_TABLE} 
ON ${DatabaseConstants.USER_TABLE}.${DatabaseConstants.PK_USER} = ${DatabaseConstants.USER_PASSWORD_TABLE}.${DatabaseConstants.FK_USER_USERPASSWORD} 
AND ${DatabaseConstants.USER_TABLE}.${DatabaseConstants.EMAIL}=?`;

export const FIND_BY_NAME = `SELECT * FROM ${DatabaseConstants.USER_TABLE} WHERE (${DatabaseConstants.FIRST_NAME} LIKE ? OR ${DatabaseConstants.LAST_NAME} LIKE ?) AND ${DatabaseConstants.PK_USER} != ? ORDER BY ${DatabaseConstants.FIRST_NAME} ASC`;

export const FIND_GROUPS_FOR_USER = `SELECT T2.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} FROM ${DatabaseConstants.CHAT_MEMBERS_MAPPING_TABLE} AS T1 JOIN (SELECT ${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} FROM ${DatabaseConstants.CHAT_MEMBERS_MAPPING_TABLE} GROUP BY ${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} HAVING COUNT(*)=?) AS T2 ON T1.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} = T2.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} WHERE ${DatabaseConstants.FK_USER_CHAT_MEMBERS_MAPPING} IN ?
 GROUP BY ${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} HAVING COUNT(*)=?`;

export const FIND_CHATS_ASSOCIATED_USER = `SELECT T4.${DatabaseConstants.PK_USER},T4.${DatabaseConstants.FIRST_NAME},T4.${DatabaseConstants.LAST_NAME},T4.${DatabaseConstants.EMAIL},T3.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} FROM 
(SELECT T1.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING}, T1.${DatabaseConstants.FK_USER_CHAT_MEMBERS_MAPPING} FROM ${DatabaseConstants.CHAT_MEMBERS_MAPPING_TABLE} T1 
  JOIN ${DatabaseConstants.CHAT_MEMBERS_MAPPING_TABLE} T2 ON T1.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING}=T2.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING} WHERE T2.${DatabaseConstants.FK_USER_CHAT_MEMBERS_MAPPING}=?) T3  
  JOIN ${DatabaseConstants.USER_TABLE} T4 ON T3.${DatabaseConstants.FK_USER_CHAT_MEMBERS_MAPPING}=T4.${DatabaseConstants.PK_USER} WHERE T4.${DatabaseConstants.PK_USER} NOT IN (?)
  ORDER BY T3.${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING}`;

export const INSERT_CHAT_CREATION = `INSERT INTO ${DatabaseConstants.CHAT_CREATION_TABLE}
(${DatabaseConstants.FK_USER_CHAT_CREATION},${DatabaseConstants.CREATED_AT}) VALUES(?,?)`;

export const INSERT_CHAT_MEMBERS_MAPPING = `INSERT INTO ${DatabaseConstants.CHAT_MEMBERS_MAPPING_TABLE} 
(${DatabaseConstants.FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING},${DatabaseConstants.FK_USER_CHAT_MEMBERS_MAPPING}) VALUES ?`;
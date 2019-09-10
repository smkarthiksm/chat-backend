import * as DatabaseConstants from './DatabaseConstants';

export const INSERT_USER = `INSERT INTO ${DatabaseConstants.USER_TABLE}
(${DatabaseConstants.FIRST_NAME},${DatabaseConstants.LAST_NAME},${DatabaseConstants.EMAIL},${DatabaseConstants.PHONE_NUMBER},${DatabaseConstants.ISACTIVE}) VALUES(?,?,?,?,?)`;

export const INSERT_PASSWORD = `INSERT INTO ${DatabaseConstants.USER_PASSWORD_TABLE}
(${DatabaseConstants.FK_USER_USERPASSWORD},${DatabaseConstants.PASSWORD}) VALUES(?,?)`;

export const FIND_BY_EMAIL = `SELECT * FROM ${DatabaseConstants.USER_TABLE} WHERE ${DatabaseConstants.EMAIL} = ?`;

export const FIND_BY_EMAIL_AND_PASSWORD = `SELECT * FROM ${DatabaseConstants.USER_TABLE} 
INNER JOIN ${DatabaseConstants.USER_PASSWORD_TABLE} 
ON ${DatabaseConstants.USER_TABLE}.${DatabaseConstants.PK_ID} = ${DatabaseConstants.USER_PASSWORD_TABLE}.${DatabaseConstants.FK_USER_USERPASSWORD} 
AND ${DatabaseConstants.USER_TABLE}.${DatabaseConstants.EMAIL}=?`;

export const FIND_BY_NAME = `SELECT * FROM ${DatabaseConstants.USER_TABLE} 
WHERE (${DatabaseConstants.FIRST_NAME} LIKE ? OR ${DatabaseConstants.LAST_NAME} LIKE ? OR ${DatabaseConstants.EMAIL} LIKE ?) 
AND ${DatabaseConstants.ISACTIVE}=1 AND ${DatabaseConstants.PK_ID} != ? ORDER BY ${DatabaseConstants.FIRST_NAME} ASC`;

export const FIND_GROUPS_FOR_USER = `SELECT T2.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} FROM ${DatabaseConstants.CHAT_MEMBERS_TABLE} AS T1 
JOIN (SELECT ${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} FROM ${DatabaseConstants.CHAT_MEMBERS_TABLE} GROUP BY ${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} HAVING COUNT(*)=?) AS T2 ON T1.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} = T2.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} WHERE ${DatabaseConstants.FK_USER_CHAT_MEMBERS} IN ? 
GROUP BY ${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} HAVING COUNT(*)=?`;

export const FIND_CHATS_ASSOCIATED_USER = `SELECT T4.${DatabaseConstants.PK_ID},T4.${DatabaseConstants.FIRST_NAME},T4.${DatabaseConstants.LAST_NAME},T4.${DatabaseConstants.EMAIL},T3.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} FROM 
(SELECT T1.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS}, T1.${DatabaseConstants.FK_USER_CHAT_MEMBERS} FROM ${DatabaseConstants.CHAT_MEMBERS_TABLE} T1 
  JOIN ${DatabaseConstants.CHAT_MEMBERS_TABLE} T2 ON T1.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS}=T2.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} WHERE T2.${DatabaseConstants.FK_USER_CHAT_MEMBERS}=?) T3  
  JOIN ${DatabaseConstants.USER_TABLE} T4 ON T3.${DatabaseConstants.FK_USER_CHAT_MEMBERS}=T4.${DatabaseConstants.PK_ID} WHERE T4.${DatabaseConstants.PK_ID} NOT IN (?)
  ORDER BY T3.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS}`;

export const INSERT_CHAT = `INSERT INTO ${DatabaseConstants.CHAT_TABLE}
(${DatabaseConstants.FK_USER_CHAT},${DatabaseConstants.CREATED_AT}) VALUES(?,?)`;

export const INSERT_CHAT_MEMBERS_ = `INSERT INTO ${DatabaseConstants.CHAT_MEMBERS_TABLE} 
(${DatabaseConstants.FK_CHAT_CHAT_MEMBERS},${DatabaseConstants.FK_USER_CHAT_MEMBERS}) VALUES ?`;

export const FIND_CHAT_FOR_USER = `SELECT * FROM ${DatabaseConstants.CHAT_MEMBERS_TABLE} 
WHERE ${DatabaseConstants.FK_USER_CHAT_MEMBERS} = ? AND ${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} = ?`;

export const FIND_CHAT_MESSAGES = `SELECT T1.${DatabaseConstants.PK_ID},
T1.${DatabaseConstants.MESSAGE}, T1.${DatabaseConstants.CREATED_AT}, T2.${DatabaseConstants.PK_ID} AS userId,
T2.${DatabaseConstants.FIRST_NAME}, T2.${DatabaseConstants.LAST_NAME},
T2.${DatabaseConstants.EMAIL}, T2.${DatabaseConstants.PHONE_NUMBER}
FROM ${DatabaseConstants.CHAT_MESSAGE_TABLE} T1 JOIN ${DatabaseConstants.USER_TABLE} T2 ON 
T1.${DatabaseConstants.FK_USER_CHATMESSAGE}=T2.${DatabaseConstants.PK_ID} WHERE T1.${DatabaseConstants.FK_CHAT_CHATMESSAGE} = ? AND T1.${DatabaseConstants.ISACTIVE} = 1 ORDER BY T1.${DatabaseConstants.CREATED_AT} ASC`;

export const FIND_CHAT_MEMBERS = `SELECT T2.${DatabaseConstants.PK_ID}, T2.${DatabaseConstants.FIRST_NAME}, T2.${DatabaseConstants.LAST_NAME},
T2.${DatabaseConstants.EMAIL}, T2.${DatabaseConstants.PHONE_NUMBER}
FROM ${DatabaseConstants.CHAT_MEMBERS_TABLE} T1 JOIN ${DatabaseConstants.USER_TABLE} T2
ON T1.${DatabaseConstants.FK_USER_CHAT_MEMBERS} = T2.${DatabaseConstants.PK_ID}
WHERE T1.${DatabaseConstants.FK_CHAT_CHAT_MEMBERS} = ? AND T2.id!=?`;

export const INSERT_NEW_MESSAGE = `INSERT INTO ${DatabaseConstants.CHAT_MESSAGE_TABLE}
(${DatabaseConstants.FK_CHAT_CHATMESSAGE},${DatabaseConstants.FK_USER_CHATMESSAGE},
  ${DatabaseConstants.MESSAGE},${DatabaseConstants.CREATED_AT},${DatabaseConstants.ISACTIVE}) VALUES(?,?,?,?,?)`;
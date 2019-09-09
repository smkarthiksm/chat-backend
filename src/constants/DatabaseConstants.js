export const DATABASE_NAME = 'ChatApplication';

export const USER_TABLE = 'User';
export const FIRST_NAME = 'firstName';
export const LAST_NAME = 'lastName';
export const EMAIL = 'email';
export const PHONE_NUMBER = 'phoneNumber';

export const USER_PASSWORD_TABLE = 'UserPassword';
export const FK_USER_USERPASSWORD = 'fk_user_userPassword';
export const PASSWORD = 'password';

export const CHAT_TABLE = 'Chat';
export const FK_USER_CHAT = 'fk_user_chat';

export const CHAT_MEMBERS_TABLE = 'ChatMembers';
export const FK_CHAT_CHAT_MEMBERS = 'fk_chat_chatMembers';
export const FK_USER_CHAT_MEMBERS = 'fk_user_chatMembers';

export const CHAT_MESSAGE_TABLE = 'ChatMessage';
export const FK_CHAT_CHATMESSAGE = 'fk_chat_chatMessage';
export const FK_USER_CHATMESSAGE = 'fk_user_chatMessage';
export const MESSAGE = 'message';

export const PK_ID = 'id';
export const ISACTIVE = 'isActive';
export const CREATED_AT = 'createdAt';

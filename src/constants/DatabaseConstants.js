export const DATABASE_NAME = 'chatApplication';


export const USER_TABLE = 'User';
export const PK_USER = 'id';
export const FIRST_NAME = 'firstName';
export const LAST_NAME = 'lastName';
export const EMAIL = 'email';
export const PHONE_NUMBER = 'phoneNumber';
export const PASSWORD = 'password';
export const ISACTIVE = 'isActive';

export const USER_PASSWORD_TABLE = 'UserPassword';
export const FK_USER_USERPASSWORD = 'fk_user_userPassword';

export const CHAT_CREATION_TABLE = 'ChatCreation';
export const FK_USER_CHAT_CREATION = 'fk_user_chatCreation';
export const CREATED_AT = 'created_at';

export const CHAT_MEMBERS_MAPPING_TABLE = 'ChatMembersMapping';
export const FK_CHAT_CREATION_CHAT_MEMBERS_MAPPING = 'fk_chatCreation_chatMembersMapping';
export const FK_USER_CHAT_MEMBERS_MAPPING = 'fk_user_chatMembersMapping';
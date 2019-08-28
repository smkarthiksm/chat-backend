class ChatMembersMappingModel {
  constructor(fk_chatCreation_chatMembersMapping, fk_user_chatMembersMapping) {
    this.fk_chatCreation_chatMembersMapping = fk_chatCreation_chatMembersMapping;
    this.fk_user_chatMembersMapping = fk_user_chatMembersMapping;
  }
}
export default ChatMembersMappingModel;
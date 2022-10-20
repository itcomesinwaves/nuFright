import { createSelector } from "reselect";

const selectChatReducer = (state: any) => state.chat;

export const selectSelectedChat = createSelector(
  [selectChatReducer],
  (chat) => chat.selectedChat
);

export const selectChats = createSelector(
  [selectChatReducer],
  (chat) => chat.chats
);

export const selectFetchAgain = createSelector(
  [selectChatReducer],
  (chat) => chat.fetchAgain
);

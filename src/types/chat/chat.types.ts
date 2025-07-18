export interface Message {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string;
  chat_room_id: number;
  read_status: string;
}

export interface User {
  user_id: string;
  nickname: string;
  file_group_id: string | null;
  up_file: string | null;
}

export interface ChatRoomInfoRes {
  chat_room_id: number;
  product_id: number;
  user1: User;
  user2: User;
}

export interface ChatRoom {
  chat_room_id: number;
  chat_user1: string;
  chat_user2: string;
  last_insert_dt: string;
  last_message: string;
  nickname: string;
  path: string | null;
  unread_count: number;
  up_file: string;
  user1_status: "true" | "false";
  user2_status: "true" | "false";
}

export interface ChatListRes {
  chatList: ChatRoom[];
}

export interface ChatDetailReq {
  chat_room_id: number | undefined;
  limit: number;
  current_page: number;
}

export interface ChatDetailRes {
  chat_room_id: number;
  product_id: number;
  chat: Message[];
  user1: User;
  user2: User;
}

export interface ChatRoomRes {
  chat_room_id: number;
  user1_id: string;
  user2_id: string;
  user1_status: "online" | "offline";
  user2_status: "online" | "offline";
}

export interface ChatRes {
  chat_room_id: number;
  chat_room_status: string;
  chat_user1: string;
  chat_user2: string;
  insert_dt: string;
  update_dt: string;
}

export interface ChatUserInfo {
  user_id: string;
  user_name: string;
  phone_number: string;
  addr_post: string;
  addr_detail: string;
  bank: string;
  account_name: string;
  account_number: string;
}

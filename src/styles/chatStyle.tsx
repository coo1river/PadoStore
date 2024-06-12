import styled from "styled-components";

export const ChatMain = styled.main`
  width: 1200px;
  height: calc(100vh - 215px);
  margin: 0 auto;
  display: flex;
`;

export const ChatList = styled.article`
  width: 500px;
  background-color: var(--color-trans-grey);
  border-radius: 15px 0 0 10px;

  .profile_img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .user_wrap {
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 2px solid var(--color-lightgrey);
  }

  .nickname_chat_wrap {
    line-height: 1.2rem;
  }

  .nickname {
    font-weight: 600;
  }
`;

export const ChatRoomWrap = styled.article`
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChatRoom = styled.article`
  width: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: #424242;

  .info_text {
    text-align: center;
  }

  .chat {
    display: flex;
    flex-direction: column;
    padding: 13px 15px;
    width: fit-content;
    max-width: 60%;
    margin: 10px 5px;
    border-radius: 20px;
    font-weight: 500;
  }

  .message_other_wrap {
    display: flex;
    align-items: center;
  }

  .profile_image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-left: 10px;
  }

  .time_stamp {
    align-self: end;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .message_other {
    background-color: var(--color-trans-grey);
  }

  .message_self_wrap {
    align-self: flex-end;
    display: flex;
    align-items: center;
  }

  .message_self {
    background-color: var(--color-main);
    color: white;
  }
`;

export const ChatInputWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  position: relative;

  .input_message {
    width: 100%;
    background-color: var(--color-trans-grey);
    padding: 15px 25px;
    border-radius: 30px;
    font-size: 15px;
  }

  .btn_send {
    margin: 0 10px;
    right: 5px;
    top: 4px;
    position: absolute;
    color: white;
    padding: 8px;
    font-weight: 600;
    border-radius: 30px;
  }
`;

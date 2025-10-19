export interface IMessage {
  _id: string;
  sender: string;   // userId of sender
  receiver: string; // userId of receiver
  text: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISendMessagePayload {
  senderId: string;
  receiverId: string;
  text: string;
}

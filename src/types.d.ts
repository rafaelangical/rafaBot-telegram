declare namespace Types {
  export interface FromMessage {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    language_code: string;
  }
  export interface ChatMessage {
    id: number;
    first_name: string;
    last_name: string;
    type: string;
  }
  export interface MessageResponse {
    message_id: number;
    from: FromMessage;
    chat: ChatMessage;
    date: number | string;
    text: string;
  }
}

export type ChatMessage = {
  session: ChatSession;
  content: string;
  role: string;
  createTime: string;
};

export type ChatSession = {
  id: number;
  title: string;
  time: string;
  sessionNum: number;
  message: ChatMessage[];
};

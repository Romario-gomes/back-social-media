interface ICreateCommentDTO {
  id?: string;
  user_id: string;
  post_id: string;
  content: string;
}

export { ICreateCommentDTO };

interface ICreatePostDTO {
  id?: string;
  user_id?: string;
  content: string;
  midia?: string;
  likes?: number;
}

export { ICreatePostDTO };

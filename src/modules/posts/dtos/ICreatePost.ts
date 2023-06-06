interface ICreatePostDTO {
  id?: string;
  user_id?: string;
  title: string;
  content: string;
  midia?: string;
  likes?: number;
}

export { ICreatePostDTO };

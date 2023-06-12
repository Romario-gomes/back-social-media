import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { Post } from "../../../../posts/infra/typeorm/entities/Post";

@Entity("comments")
class Comment {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: "post_id" })
  post: Post;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Comment };

import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "./post.model";
import { User } from "./user.model";

@ObjectType()
export class Comment {
  @Field(type => ID)
  id: String;

  @Field()
  content: string;

  @Field(type => Int  )
  likeCount: number;

  @Field(type => User)
  commenter?: User;

  @Field(type => Post)
  post?: Post;

  @Field({ nullable: true })
  createdAt: Date;
}
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Post {
  @Field(type => ID)
  id: String;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(type => Int)
  viewCount?: number;

  @Field(type => User)
  uploader: User;

}
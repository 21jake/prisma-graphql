import 'reflect-metadata';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { IsDate, IsEmail } from 'class-validator';
import { Post } from './post.model';
import { Comment } from './comment.model';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field((type) => Boolean, { nullable: true })
  isActive: Boolean;

  @Field((type) => [Post], { nullable: true })
  posts?: Post[];

  @Field((type) => [Comment], { nullable: true })
  comments?: Comment[];

  @Field((type) => Post, { nullable: true })
  bestPost?: Post

  @Field((type) => Comment, { nullable: true })
  newestComment?: Comment


}

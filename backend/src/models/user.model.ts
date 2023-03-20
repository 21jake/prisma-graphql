import 'reflect-metadata';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { IsDate, IsEmail } from 'class-validator';
import { Post } from './post.model';

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
  @IsDate()
  createdAt: Date;

  @Field((type) => Boolean, { nullable: true })
  isActive: Boolean;

  @Field((type) => [Post], { nullable: true })
  posts?: Post[];
}

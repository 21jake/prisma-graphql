import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
// import { Post } from './post'
// import { User } from './user'
// import { PrismaService } from './prisma.service'
// import { PostCreateInput } from './resolvers.post'
import { User } from 'src/models/user.model';
import { PrismaService } from 'src/services/prisma.service';
import { Post } from '@prisma/client';
import { IsEmail } from 'class-validator';
import { Comment } from 'src/models/comment.model';

// @InputType()
// class UserUniqueInput {
//   @Field({ nullable: true })
//   id: number;

//   @Field({ nullable: true })
//   email: string;
// }

// @InputType()
// class UserCreateInput {
//   @Field()
//   email: string;

//   @Field({ nullable: true })
//   name: string;

//   @Field((type) => [PostCreateInput], { nullable: true })
//   posts: [PostCreateInput];
// }

@InputType()
class UserCreateInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  address: string;

  @Field()
  name: string;
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField('posts')
  async posts(@Parent() user: User, @Context() ctx): Promise<Post[]> {
    return this.prismaService.post.findMany({ where: { uploaderId: user.id } });
  }

  @ResolveField('comments')
  async comments(@Parent() user: User, @Context() ctx): Promise<Comment[]> {
    return this.prismaService.comment.findMany({ where: { commenterId: user.id } });
  }

  @ResolveField('bestPost')
  async bestPost(@Parent() user: User, @Context() ctx): Promise<Post> {
    return this.prismaService.post.findFirst({
      where: { uploaderId: user.id },
      orderBy: { viewCount: 'desc' },
      take: 1,
    });
  }

  @Query(() => [User], { nullable: true, name: 'users' })
  async getMany(@Context() ctx) {
    return await this.prismaService.user.findMany();
  }

  @Query(() => User, { nullable: true, name: 'user' })
  async user(@Args('id') id: string, @Context() ctx) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput, @Context() ctx): Promise<User> {
    const { id } = await this.prismaService.user.create({
      data: {
        email: input.email,
        name: input.name,
        address: input.address,
      },
    });

    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  //   @Mutation((returns) => User)
  //   async signupUser(
  //     @Args('data') data: UserCreateInput,
  //     @Context() ctx,
  //   ): Promise<User> {
  //     const postData = data.posts?.map((post) => {
  //       return { title: post.title, content: post.content || undefined }
  //     })

  //     return this.prismaService.user.create({
  //       data: {
  //         email: data.email,
  //         name: data.name,
  //         posts: {
  //           create: postData,
  //         },
  //       },
  //     })
  //   }

  //   @Query((returns) => [User], { nullable: true })
  //   async allUsers(@Context() ctx) {
  //     return this.prismaService.user.findMany()
  //   }

  //   @Query((returns) => [Post], { nullable: true })
  //   async draftsByUser(
  //     @Args('userUniqueInput') userUniqueInput: UserUniqueInput,
  //   ): Promise<Post[]> {
  //     return this.prismaService.user
  //       .findUnique({
  //         where: {
  //           id: userUniqueInput.id || undefined,
  //           email: userUniqueInput.email || undefined,
  //         },
  //       })
  //       .posts({
  //         where: {
  //           published: false,
  //         },
  //       })
  //   }
}

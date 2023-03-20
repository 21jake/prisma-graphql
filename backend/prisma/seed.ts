import { faker } from '@faker-js/faker';
import { PrismaClient, Prisma } from '@prisma/client';
import { sample } from 'lodash';

const seedCount = {
  users: 10,
  posts: 15,
  comments: 20,
};

//   return {
//     users,
//     posts,
//     comments,
//   };

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const seedUserPromises = Array.from({ length: seedCount.users }).map((_, i) => {
    return prisma.user.create({
      data: {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        isActive: i % 2 === 0,
      },
    });
  });

  const users = await Promise.all(seedUserPromises);

  const seedPostPromises = Array.from({ length: seedCount.posts }).map((_, i) => {
    return prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        viewCount: Number(faker.random.numeric(3)),
        uploaderId: users[i % users.length].id,
        type: sample(['FREE', 'PAID']),
      },
    });
  });

  const posts = await Promise.all(seedPostPromises);

  const seedCommentPromises = Array.from({ length: seedCount.comments }).map((_, i) => {
    return prisma.comment.create({
      data: {
        content: faker.lorem.sentence(),
        commenterId: users[i % users.length].id,
        postId: posts[i % posts.length].id,
        likeCount: Number(faker.random.numeric(2)),
      },
    });
  });

  const comments = await Promise.all(seedCommentPromises);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

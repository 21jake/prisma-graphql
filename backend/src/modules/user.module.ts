import { Module } from '@nestjs/common';
import { UserResolver } from 'src/resolvers/user.resolver';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UserResolver],
})
export class UserModule {}

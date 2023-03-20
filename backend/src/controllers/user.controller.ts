import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}


}

import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Book} from "./entities/book.entity";
import {ReviewEntity} from "./entities/review.entity";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";

@Module({
  imports:[
      TypeOrmModule.forFeature([Book, ReviewEntity]),
      UserModule
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService]
})
export class BookModule {}

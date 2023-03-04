import {HttpException, HttpStatus, Injectable, UploadedFile} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Book} from "./entities/book.entity";
import {Repository} from "typeorm";
import {addBookDto, reviewBookDto, updateBookDto} from "./dto/book.dto";
import * as fs from 'fs';
import {UserService} from "../user/user.service";
import {ReviewEntity} from "./entities/review.entity";


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly repository: Repository<Book>,
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
        private readonly userSercice: UserService,


    ) {
    }

    async getAllBook(): Promise<Book[]> {
        return this.repository.find();
    }

    async deleteImage(fileName: string): Promise<any> {
        await fs.unlink("uploads/" + fileName, (err) => {
            if (err) {
                console.error(err);
                return err;
            }
        });
    }

    async addBook(dto: addBookDto, @UploadedFile() file: Express.Multer.File) {

        const isExitsted = await this.repository.createQueryBuilder('books')
            .where('books.title = :title', {title: dto.title})
            .getOne();
        if(isExitsted) {
            throw new HttpException('Book isExitsted', HttpStatus.BAD_REQUEST)
        }
        if(file.filename){
            dto.img1 = `http://localhost:5000/${file.filename}`
            dto.img2 = `http://localhost:5000/${file.filename}`
        }
        return this.repository.save(dto)
    }

    async updateBook(id: number, dto: updateBookDto) {
        return await this.repository.update(id, dto)
    }

    async findoneBook(id: number) {
        return this.repository.createQueryBuilder('books')
            .where('books.id = :id', {id: id})
            .getOne()
    }

    async deleteBook(id: number): Promise<void> {
        const book = await this.repository.createQueryBuilder('books')
            .where('books.id = :params', {params: id})
            .getOne();

        const originImage = book.img1.split('/')
        await fs.unlink("uploads/" + originImage[3], (err) => {
            if (err) {
                return err;
            }
        });
        await this.repository.delete(id)
    }

    async getImage(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
    }

    async reviewBook( id: number, dto: reviewBookDto, user_id: number) {
        const Book = await  this.findoneBook(id);
        const User = await this.userSercice.findOne(user_id)
        return this.reviewRepository.save({
            user: User, book: Book, rating: dto.rating, comment: dto.comment
        })
    }

    async getreview(id:number){
        const listReview = await this.reviewRepository.createQueryBuilder('review')
            .leftJoinAndSelect('review.user', 'user')
            .leftJoinAndSelect('review.book', 'book')
            .where('review.bookId = :id', {id: id})
            .getMany();

        return listReview
    }

}

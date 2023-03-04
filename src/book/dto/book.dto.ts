import {IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, Length, MinLength} from "class-validator";
import {Transform} from "stream";
import {ApiProperty} from "@nestjs/swagger";
import {BookState} from "../entities/book.entity";
import {Exclude} from "class-transformer";
import {BOOK} from "../../constants/message.constant";

export class addBookDto {

    @ApiProperty({example: "Sach kinh di"})
    @Length(3, 30, {message: BOOK.TITLE_LENGTH})
    title: string;

    @ApiProperty({example: " To Huu"})
    @IsNotEmpty()
    @Length(3, 30, {message: BOOK.AUTHOR_LENGTH})
    author: string;

    @ApiProperty({example: "Kinh di"})
    @IsString()
    category: string;

    @ApiProperty({example:"duoc phat hanh nam 1938"})
    @Length(3, 300, {message: BOOK.DESCRIBE})
    des: string

    @ApiProperty()
    @IsOptional()
    img1: string

    @IsOptional()
    @ApiProperty()
    img2: string

    @ApiProperty({ example: 123 })
    @IsOptional()
    pageNumber: number;

    @ApiProperty()
    @IsOptional()
    rating: number;

    @IsString({ each: true })
    @IsOptional()
    review: string[];

    @ApiProperty({example: 12 })
    @IsOptional()
    price: number;

    @ApiProperty({example: 20 })
    @IsOptional()
    oldPrice: number;

   @IsOptional()
   releaseDate: Date


}

export class updateBookDto extends addBookDto {
}

export class IdDto {
    @IsNotEmpty()
    id: number;
}
export class reviewBookDto {
    @ApiProperty({example: 1})
    @IsPositive()
    rating: number;

    @ApiProperty({example:"chan qua di"})
    comment: string;
}
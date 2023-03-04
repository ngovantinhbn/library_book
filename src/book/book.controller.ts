import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Req, UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {BookService} from "./book.service";
import {addBookDto, IdDto, reviewBookDto, updateBookDto} from "./dto/book.dto";
import {Book} from "./entities/book.entity";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../upload/config";
import * as fs from "fs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RequestUser} from "../user/entities/user.entity";
import {Role} from "../base/role";
import {Roles} from "../base/role/roles.decorator";

@ApiTags('Book')
@Controller('book')
@UseInterceptors(ClassSerializerInterceptor)

export class BookController {
    constructor(
        private readonly service: BookService,
        @InjectRepository(Book)
        private readonly repository: Repository<Book>
    ) {}

    @Get()
    @ApiOperation({ summary: 'List All Book' })
    async getBook() {
        return this.service.getAllBook()
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Get One Book' })
    async getOneBook(@Param() param: IdDto) {
        return this.service.findoneBook(param.id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('file',multerOptions ))
    @ApiOperation({ summary: 'Create Book' })
    async addBook(@Body() dto: addBookDto, @UploadedFile() file: Express.Multer.File): Promise<Book> {
        return this.service.addBook(dto, file)
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Change information of '  })
    @UseInterceptors(FileInterceptor('file',multerOptions ))
    async updateBook(@Param() param: IdDto, @Body() dto: updateBookDto, @UploadedFile() file ?: Express.Multer.File){
        if(file){
            const lastImage = await this.repository.createQueryBuilder('bookdata')
                .where('bookdata.id =:params',{ params: param.id })
                .getOne();
            const originImage = lastImage.img1.split('/')
            await fs.unlink("uploads/"+ originImage[3], (err) => {
                if (err) {
                    console.error(err);
                    return err;
                }
            });
            dto.img1 = `http://localhost:5000/${file.filename}`
        }
        return this.service.updateBook(param.id, dto)
    }

    @Delete('/img/:fileName')
    @ApiParam({name:"fileName"})
    async deletePicture(@Param('fileName') fileName: string) {
        return this.service.deleteImage(fileName)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Book '  })
    async deleteBook(@Param() params: IdDto){
        return this.service.deleteBook(params.id)
    }

    @Put('getfile')
    @UseInterceptors(FileInterceptor('file',multerOptions ))
    async  getfile( @UploadedFile() file: Express.Multer.File){
        return this.service.getImage(file)
    }

    @Post(':id/review')
    @ApiParam({ name: 'id', type: Number })
    @ApiBearerAuth()
    async review(@Body() dto: reviewBookDto, @Req() req: RequestUser, @Param() params: IdDto){
        return this.service.reviewBook(params.id, dto, req.user.id )

    }

    @Get(':id/review')
    @ApiOperation({ summary: 'List review' })
    @ApiParam({ name: 'id', type: Number })
    async getReviewProduct(@Param() params: IdDto) {
        return this.service.getreview(params.id)
    }
}

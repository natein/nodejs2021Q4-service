import fs from 'fs';
import resolvePath from 'resolve-path';
import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

interface fileReponse {
  originalname: string;
  filename: string;
}

@Controller('file')
export default class FileController {
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response: fileReponse[] = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
    const stream = fs.createReadStream(resolvePath(image));
    res.type('text/html').send(stream);
  }

  /*  @Get('/:filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.streamFile(filename);
  } */
}

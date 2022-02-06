import { Controller, Get, NotFoundException, Param, Res, StreamableFile
} from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import 'dotenv/config';
import * as fs from 'fs';
import * as util from 'util';
import * as stream from 'stream';

@Controller('file')
export class FileControllerExpress { 

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

}

@Controller('file')
export class FileControllerFastify {

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    if (!fs.existsSync(join(join(__dirname, '../../files'), filename))) {
      throw new NotFoundException();
    }
    return new StreamableFile(
      createReadStream(join(join(__dirname, '../../files'), filename)),
    );
  }
  async fileFastifySave(_: string, file, filename): Promise<string> {
    const pipeline = util.promisify(stream.pipeline);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const filename_randomName = `${randomName}-${filename}`;
    const writeStream = fs.createWriteStream(
      `${join(__dirname, '../../files')}/${filename_randomName}`,
    );

    await pipeline(file, writeStream);
    console.log(filename_randomName);
    return filename_randomName;
  }
  
}

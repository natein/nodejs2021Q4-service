import { Injectable } from '@nestjs/common';

@Injectable()
export default class FileService {
  async streamFile(filename: string) {
    return { filename: filename };
  }
}

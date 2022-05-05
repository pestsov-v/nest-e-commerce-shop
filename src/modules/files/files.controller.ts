import {
  Controller, Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  
  @Post('project/:projectId')
  @UseInterceptors(FileInterceptor('dwg'))
  async uploadProject(@UploadedFile() project: Express.Multer.File, @Param() projectId: string) {
    return this.fileService.saveProject([project], projectId);
  }
}

import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { fileIdDto } from './dto/fileId.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('dwg/:id')
  @UseInterceptors(FileInterceptor('dwg'))
  async uploadProjectDWG(
    @UploadedFile() project: Express.Multer.File,
    @Param() dwgId: fileIdDto,
  ) {
    return this.fileService.saveProjectDWG([project], dwgId);
  }

  @Post('xls/:id')
  @UseInterceptors(FileInterceptor('spec'))
  async uploadSpecification(
    @UploadedFile() spec: Express.Multer.File,
    @Param() xlsId: fileIdDto,
  ) {
    return this.fileService.saveSpecification([spec], xlsId);
  }

  @Post('pdf/:id')
  @UseInterceptors(FileInterceptor('pdf'))
  async uploadProjectPDF(
    @UploadedFile() pdf: Express.Multer.File,
    @Param() pdfId: fileIdDto,
  ) {
    console.log(pdf);
    return this.fileService.saveProjectPDF([pdf], pdfId);
  }

  @Post('project/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'spec', maxCount: 1 },
      { name: 'dwg', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ]),
  )
  async uploadProject(
    @UploadedFiles()
    project: {
      dwg: Express.Multer.File;
      pdf: Express.Multer.File;
      spec: Express.Multer.File;
    },
    @Param() projectId: fileIdDto,
  ) {
    const dwg = await this.fileService.saveProjectDWG(
      [project.dwg[0]],
      projectId,
    );
    const spec = await this.fileService.saveSpecification(
      [project.spec[0]],
      projectId,
    );
    const pdf = await this.fileService.saveProjectPDF(
      [project.pdf[0]],
      projectId,
    );

    const object = { dwg, pdf, spec };

    return object;
  }
}

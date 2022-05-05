import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { projectName } from './files.constants';
import { FileResponse } from './response/file.response';
import { fileIdDto } from './dto/fileId.dto';

@Injectable()
export class FilesService {
  async saveProjectDWG(
    dwg: Express.Multer.File[],
    dwgId: fileIdDto,
  ): Promise<FileResponse[]> {
    const dwgName: string = projectName(dwgId.id);
    const uploadProject = `${path}/objects/${dwgName}`;

    await ensureDir(uploadProject);

    const response = await Promise.all(
      dwg.map(async (d) => {
        await writeFile(`${uploadProject}/${d.originalname}`, d.buffer);
        return {
          url: `/objects/${uploadProject}/${d.originalname}`,
          name: d.originalname,
        };
      }),
    );

    return response;
  }

  async saveSpecification(
    spec: Express.Multer.File[],
    xlsId: fileIdDto,
  ): Promise<FileResponse[]> {
    const xlsName: string = projectName(xlsId.id);
    const uploadProject = `${path}/objects/${xlsName}`;
    await ensureDir(uploadProject);

    const response = await Promise.all(
      spec.map(async (s) => {
        await writeFile(`${uploadProject}/${s.originalname}`, s.buffer);
        return {
          url: `/objects/${uploadProject}/${s.originalname}`,
          name: s.originalname,
        };
      }),
    );

    return response;
  }

  async saveProjectPDF(
    pdf: Express.Multer.File[],
    pdfId: fileIdDto,
  ): Promise<FileResponse[]> {
    const pdfName: string = projectName(pdfId.id);
    const uploadProject = `${path}/objects/${pdfName}`;
    await ensureDir(uploadProject);

    const response = await Promise.all(
      pdf.map(async (p) => {
        await writeFile(`${uploadProject}/${p.originalname}`, p.buffer);
        return {
          url: `/objects/${uploadProject}/${p.originalname}`,
          name: p.originalname,
        };
      }),
    );

    return response;
  }
}

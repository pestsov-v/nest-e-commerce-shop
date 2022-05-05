import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { projectName } from './files.constants';
import { FileResponse } from './response/file.response';
import { fileIdDto } from './dto/fileId.dto';
import * as fs from 'fs';
import { format } from 'date-fns';

@Injectable()
export class FilesService {
  async saveProjectDWG(
    dwg: Express.Multer.File[],
    dwgId: fileIdDto,
  ): Promise<FileResponse[]> {
    const mimeType = dwg[0].mimetype.split('.')[1];
    const dwgName: string = projectName(dwgId.id);
    const uploadProject = `${path}/objects/${dwgName}`;

    await ensureDir(uploadProject);

    const response = await Promise.all(
      dwg.map(async (d) => {
        await writeFile(`${uploadProject}/${dwgName}.${mimeType}`, d.buffer);
        return {
          url: `/objects/${uploadProject}/${dwgName}.${mimeType}`,
          name: `${dwgName}.${mimeType}`,
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
    const mimeType = spec[0].mimetype.split('/')[1];
    const uploadProject = `${path}/objects/${xlsName}`;
    await ensureDir(uploadProject);

    const response = await Promise.all(
      spec.map(async (s) => {
        await writeFile(`${uploadProject}/${xlsName}.xlsx`, s.buffer);
        return {
          url: `/objects/${uploadProject}/${xlsName}.xlsx`,
          name: `${xlsName}.xlsx`,
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
    const mimeType = pdf[0].mimetype.split('/')[1];
    const uploadProject = `${path}/objects/${pdfName}`;
    await ensureDir(uploadProject);

    const response = await Promise.all(
      pdf.map(async (p) => {
        await writeFile(`${uploadProject}/${pdfName}.${mimeType}`, p.buffer);
        return {
          url: `/objects/${uploadProject}/${pdfName}.${mimeType}`,
          name: `${pdfName}.${mimeType}`,
        };
      }),
    );

    return response;
  }

  async deleteProjectDWG(dwgId: fileIdDto) {
    const dwgName: string = projectName(dwgId.id);
    const year = format(new Date(), 'yyyy');
    const uploadProject = `${path}/objects/${dwgName}/О-${dwgId.id}-${year}.dwg`;

    fs.unlink(uploadProject, (err) => {
      if (err) {
        return;
      }
    });
  }

  async deleteProjectPDF(pdfId: fileIdDto) {
    const pdfName: string = projectName(pdfId.id);
    const year = format(new Date(), 'yyyy');
    const uploadProject = `${path}/objects/${pdfName}/О-${pdfId.id}-${year}.pdf`;

    fs.unlink(uploadProject, (err) => {
      if (err) {
        return;
      }
    });
  }

  async deleteProjectSpec(xlsxId: fileIdDto) {
    const xlsxName: string = projectName(xlsxId.id);
    const year = format(new Date(), 'yyyy');
    const uploadProject = `${path}/objects/${xlsxName}/О-${xlsxId.id}-${year}.xlsx`;

    fs.unlink(uploadProject, (err) => {
      if (err) {
        return;
      }
    });
  }
}

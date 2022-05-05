import { Injectable } from '@nestjs/common';
import { FileResponse } from './response/file.response';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { format } from 'date-fns';

@Injectable()
export class FilesService {
  async saveProject(project: Express.Multer.File[], projectId) {
    const year = format(new Date(), 'yyyy');
    const projectName = `О-${projectId.projectId}-${year}`;

    const uploadProject = `${path}/objects/${projectName}`;
    await ensureDir(uploadProject);

    const response = await Promise.all(
      project.map(async (d) => {
        await writeFile(`${uploadProject}/${d.originalname}`, d.buffer);
        return {
          url: `/objects/${uploadProject}/${d.originalname}`,
          name: d.originalname,
        };
      }),
    );
    console.log(response);
    return response;
  }

  async saveSpecification(spec: Express.Multer.File) {
    console.log(spec)
  }

}

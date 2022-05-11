import { Link } from '../link.entity';

export class DeleteLinkResponse {
  status: string;
  message: string;
  deletedLink: Link;
}

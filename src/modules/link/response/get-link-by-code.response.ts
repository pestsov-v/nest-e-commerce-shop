import { Link } from '../link.entity';

export class GetLinkByCodeResponse {
  status: string;
  message: string;
  data: Link;
}

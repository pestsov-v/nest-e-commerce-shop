import { Link } from '../link.entity';

export class createLinkResponse {
  status: string;
  message: string;
  data: {
    link: Link;
  };
}

import { Link } from '../link.entity';

export class GetLinksResponse {
  status: string;
  amount: number;
  data: {
    data: Link[];
  };
}

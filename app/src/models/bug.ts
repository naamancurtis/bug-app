import { Priority } from './priority';
import { Status } from './status';

export type Bug = {
  projectId: string;
  id: string;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
};

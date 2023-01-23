import {
  counterpartHandlers,
  counterpartBankHandlers,
  counterpartContactHandlers,
} from './counterparts';
import { payableHandlers } from './payables';
import { tagsHandlers } from './tags';
import { workflowsHandlers } from './workflows';
import { receivableHandlers } from './receivables';
import { entityUsersHandlers } from './entityUsers';

export const handlers = [
  ...counterpartHandlers,
  ...counterpartBankHandlers,
  ...counterpartContactHandlers,
  ...payableHandlers,
  ...tagsHandlers,
  ...workflowsHandlers,
  ...receivableHandlers,
  ...entityUsersHandlers,
];

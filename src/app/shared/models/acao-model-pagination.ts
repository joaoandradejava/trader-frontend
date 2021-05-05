import { AcaoModel } from './acao-model';
export interface AcaoModelPagination {
  content: AcaoModel[];
  totalPages: number;
  totalElements: number;
  size: number
  number: number
}

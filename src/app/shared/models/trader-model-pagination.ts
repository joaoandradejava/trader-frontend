import { TraderModelPaginationItem } from './trader-model-pagination-item';
export interface TraderModelPagination {
  content: TraderModelPaginationItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

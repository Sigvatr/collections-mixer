import { SortMetadata } from './sort.metadata';

export class TableData {
    columns: string[];
    data: any[];
    order: SortMetadata|null;
}

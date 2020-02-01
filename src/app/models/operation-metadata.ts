import { Operation } from './operation.enum';
import { ColumnMetaData } from './column-meta-data';

export class OperationMetadata {
  operation: Operation;
  firstColumn: ColumnMetaData;
  secondColumn: ColumnMetaData;
}

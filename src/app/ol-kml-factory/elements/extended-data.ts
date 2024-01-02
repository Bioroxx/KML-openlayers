import {ExtendedDataType} from '@bioroxx/kmljs';
import {Data} from './data';
import {SchemaData} from './schema-data';

export class ExtendedData implements ExtendedDataType {

  data: Data[];
  schemaData: SchemaData[];
  any: any[]; // Arbitrary XML elements

  constructor(extendedDataType: ExtendedDataType) {

    this.data = extendedDataType.data;
    this.schemaData = extendedDataType.schemaData;
    this.any = extendedDataType.any;
  }
}

import {ID, SchemaType} from 'kmljs';
import {SimpleField} from './simple-field';

export class Schema implements SchemaType {

  id?: ID;
  name?: string;
  simpleField?: SimpleField[];

  constructor(schemaType: SchemaType) {

    this.id = schemaType.id;
    this.name = schemaType.name;
    this.simpleField = schemaType.simpleField;
  }
}

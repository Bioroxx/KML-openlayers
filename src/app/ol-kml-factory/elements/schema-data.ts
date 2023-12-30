import {AnyURI, SchemaDataType} from 'kmljs';
import {AbstractObjectGroup} from './abstract-object-group';
import {SimpleData} from './simple-data';

export class SchemaData extends AbstractObjectGroup implements SchemaDataType {

  schemaUrl?: AnyURI;
  simpleData: SimpleData[];

  constructor(schemaDataType: SchemaDataType) {
    super(schemaDataType);

    this.schemaUrl = schemaDataType.schemaUrl;
    this.simpleData = schemaDataType.simpleData;
  }
}

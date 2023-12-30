import {SimpleFieldType} from 'kmljs';

export class SimpleField implements SimpleFieldType {

  type?: string;
  name?: string;
  displayName?: string;

  constructor(simpleFieldType: SimpleFieldType) {
    this.type = simpleFieldType.type;
    this.name = simpleFieldType.name;
    this.displayName = simpleFieldType.displayName;
  }
}

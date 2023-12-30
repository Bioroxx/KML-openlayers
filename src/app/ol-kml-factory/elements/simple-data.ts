import {SimpleDataType} from 'kmljs';

export class SimpleData implements SimpleDataType {

  name?: string;
  textContent?: string;

  constructor(simpleDataType: SimpleDataType) {
    this.name = simpleDataType.name;
    this.textContent = simpleDataType.textContent;
  }

}

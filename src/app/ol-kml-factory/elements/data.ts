import {DataType} from '@bioroxx/kmljs';
import {AbstractObjectGroup} from './abstract-object-group';

export class Data extends AbstractObjectGroup implements DataType {

  name?: string;
  displayName?: string;
  value?: string;

  constructor(dataType: DataType) {
    super(dataType);

    this.name = dataType.name;
    this.displayName = dataType.displayName;
    this.value = dataType.value;
  }
}

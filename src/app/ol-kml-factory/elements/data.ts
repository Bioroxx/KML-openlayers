import {AbstractObjectGroup, DataType} from '@bioroxx/kmljs';

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

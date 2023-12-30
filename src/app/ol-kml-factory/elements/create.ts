import {CreateType} from 'kmljs';
import {AbstractContainerGroup} from './abstract-container-group';

export class Create implements CreateType {

  container: AbstractContainerGroup[];

  constructor(createType: CreateType) {
    this.container = createType.container;
  }
}

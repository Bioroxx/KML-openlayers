import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractContainerType} from 'kmljs';

export abstract class AbstractContainerGroup extends AbstractFeatureGroup implements AbstractContainerType {

  constructor(abstractContainerType: AbstractContainerType) {
    super(abstractContainerType);
  }
}

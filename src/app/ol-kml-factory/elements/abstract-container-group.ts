import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractContainerType} from '@bioroxx/kmljs';

export abstract class AbstractContainerGroup extends AbstractFeatureGroup implements AbstractContainerType {

  protected constructor(abstractContainerType: AbstractContainerType) {
    super(abstractContainerType);
  }
}

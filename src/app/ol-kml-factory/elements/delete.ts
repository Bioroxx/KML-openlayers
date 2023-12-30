import {DeleteType} from 'kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';

export class Delete implements DeleteType {

  feature: AbstractFeatureGroup[];

  constructor(deleteType: DeleteType) {
    this.feature = deleteType.feature;
  }
}

import {AbstractObjectGroup} from './abstract-object-group';
import {AbstractViewType} from '@bioroxx/kmljs';

export abstract class AbstractViewGroup extends AbstractObjectGroup implements AbstractViewType {

  constructor(abstractViewType: AbstractViewType) {
    super(abstractViewType);
  }


}

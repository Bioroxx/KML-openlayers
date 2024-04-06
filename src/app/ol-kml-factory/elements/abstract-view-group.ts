import {AbstractObjectGroup, AbstractViewType} from '@bioroxx/kmljs';

export abstract class AbstractViewGroup extends AbstractObjectGroup implements AbstractViewType {

  protected constructor(abstractViewType: AbstractViewType) {
    super(abstractViewType);
  }

}

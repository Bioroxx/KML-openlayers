import {AbstractObjectGroup, AbstractSubStyleType} from '@bioroxx/kmljs';

export abstract class AbstractSubStyleGroup extends AbstractObjectGroup implements AbstractSubStyleType {

  protected constructor(abstractSubStyleType: AbstractSubStyleType) {
    super(abstractSubStyleType);
  }
}

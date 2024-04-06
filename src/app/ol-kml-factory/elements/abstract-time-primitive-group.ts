import {AbstractObjectGroup, AbstractTimePrimitiveType} from '@bioroxx/kmljs';

export abstract class AbstractTimePrimitiveGroup extends AbstractObjectGroup implements AbstractTimePrimitiveType {

  protected constructor(abstractTimePrimitiveType: AbstractTimePrimitiveType) {
    super(abstractTimePrimitiveType);
  }

}

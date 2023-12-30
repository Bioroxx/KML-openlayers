import {AbstractObjectGroup} from './abstract-object-group';
import {AbstractTimePrimitiveType} from 'kmljs';

export abstract class AbstractTimePrimitiveGroup extends AbstractObjectGroup implements AbstractTimePrimitiveType {

  constructor(abstractTimePrimitiveType: AbstractTimePrimitiveType) {
    super(abstractTimePrimitiveType);
  }

}

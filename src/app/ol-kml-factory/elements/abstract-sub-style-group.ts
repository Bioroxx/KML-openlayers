import {AbstractObjectGroup} from './abstract-object-group';
import {AbstractSubStyleType} from '@bioroxx/kmljs';

export abstract class AbstractSubStyleGroup extends AbstractObjectGroup implements AbstractSubStyleType {

  constructor(abstractSubStyleType: AbstractSubStyleType) {
    super(abstractSubStyleType);
  }
}

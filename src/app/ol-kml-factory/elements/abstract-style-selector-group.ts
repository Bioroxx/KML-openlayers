import {AbstractObjectGroup} from './abstract-object-group';
import {AbstractStyleSelectorType} from '@bioroxx/kmljs';

export abstract class AbstractStyleSelectorGroup extends AbstractObjectGroup implements AbstractStyleSelectorType {

  constructor(abstractStyleSelectorType: AbstractStyleSelectorType) {
    super(abstractStyleSelectorType);
  }
}

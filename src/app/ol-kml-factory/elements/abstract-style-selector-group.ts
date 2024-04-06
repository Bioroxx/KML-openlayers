import {AbstractObjectGroup, AbstractStyleSelectorType} from '@bioroxx/kmljs';

export abstract class AbstractStyleSelectorGroup extends AbstractObjectGroup implements AbstractStyleSelectorType {

  protected constructor(abstractStyleSelectorType: AbstractStyleSelectorType) {
    super(abstractStyleSelectorType);
  }
}

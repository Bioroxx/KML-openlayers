import {AbstractSubStyleGroup} from './abstract-sub-style-group';
import {AbstractColorStyleType, ColorModeEnumType, ColorType} from '@bioroxx/kmljs';

export abstract class AbstractColorStyleGroup extends AbstractSubStyleGroup implements AbstractColorStyleType {

  color?: ColorType;
  colorMode?: ColorModeEnumType;

  protected constructor(abstractColorStyleType: AbstractColorStyleType) {
    super(abstractColorStyleType);

    this.color = abstractColorStyleType.color;
    this.colorMode = abstractColorStyleType.colorMode;
  }

}

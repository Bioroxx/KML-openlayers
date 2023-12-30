import {AbstractSubStyleGroup} from './abstract-sub-style-group';
import {AbstractColorStyleType, ColorModeEnumType, ColorType} from 'kmljs';

export abstract class AbstractColorStyleGroup extends AbstractSubStyleGroup implements AbstractColorStyleType {

  color?: ColorType;
  colorMode?: ColorModeEnumType;

  constructor(abstractColorStyleType: AbstractColorStyleType) {
    super(abstractColorStyleType);

    this.color = abstractColorStyleType.color;
    this.colorMode = abstractColorStyleType.colorMode;
  }

}

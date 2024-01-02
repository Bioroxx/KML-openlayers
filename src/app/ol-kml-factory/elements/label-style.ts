import {LabelStyleType} from '@bioroxx/kmljs';
import {AbstractColorStyleGroup} from './abstract-color-style-group';

export class LabelStyle extends AbstractColorStyleGroup implements LabelStyleType {

  scale?: number;

  constructor(labelStyleType: LabelStyleType) {
    super(labelStyleType);

    this.scale = labelStyleType.scale;
  }
}

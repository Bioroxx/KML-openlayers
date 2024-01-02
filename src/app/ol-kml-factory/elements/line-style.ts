import {LineStyleType} from '@bioroxx/kmljs';
import {AbstractColorStyleGroup} from './abstract-color-style-group';

export class LineStyle extends AbstractColorStyleGroup implements LineStyleType {

  width?: number;

  constructor(lineStyleType: LineStyleType) {
    super(lineStyleType);

    this.width = lineStyleType.width;
  }
}

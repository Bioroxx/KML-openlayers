import {PolyStyleType} from '@bioroxx/kmljs';
import {AbstractColorStyleGroup} from './abstract-color-style-group';

export class PolyStyle extends AbstractColorStyleGroup implements PolyStyleType {

  fill?: boolean;
  outline?: boolean;

  constructor(polyStyleType: PolyStyleType) {
    super(polyStyleType);

    this.fill = polyStyleType.fill;
    this.outline = polyStyleType.outline;
  }
}

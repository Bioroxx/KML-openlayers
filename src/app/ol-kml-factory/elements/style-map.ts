import {StyleMapType} from 'kmljs';
import {AbstractStyleSelectorGroup} from './abstract-style-selector-group';
import {Pair} from './pair';

export class StyleMap extends AbstractStyleSelectorGroup implements StyleMapType {

  pair: Pair[];

  constructor(styleMapType: StyleMapType) {
    super(styleMapType);

    this.pair = styleMapType.pair;
  }
}

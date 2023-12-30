import {AnyURI, PairType, StyleStateEnumType} from 'kmljs';
import {AbstractObjectGroup} from './abstract-object-group';
import {AbstractStyleSelectorGroup} from './abstract-style-selector-group';

export class Pair extends AbstractObjectGroup implements PairType {

  key?: StyleStateEnumType;
  styleUrl?: AnyURI;
  styleSelector?: AbstractStyleSelectorGroup;

  constructor(pairType: PairType) {
    super(pairType);

    this.key = pairType.key;
    this.styleUrl = pairType.styleUrl;
    this.styleSelector = pairType.styleSelector;
  }
}
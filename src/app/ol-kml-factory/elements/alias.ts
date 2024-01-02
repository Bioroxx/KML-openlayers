import {AliasType, AnyURI} from '@bioroxx/kmljs';
import {AbstractObjectGroup} from './abstract-object-group';

export class Alias extends AbstractObjectGroup implements AliasType {

  targetHref?: AnyURI;
  sourceHref?: AnyURI;

  constructor(aliasType: AliasType) {
    super(aliasType);

    this.targetHref = aliasType.targetHref;
    this.sourceHref = aliasType.sourceHref;
  }
}

import {ResourceMapType} from '@bioroxx/kmljs';
import {AbstractObjectGroup} from './abstract-object-group';
import {Alias} from './alias';

export class ResourceMap extends AbstractObjectGroup implements ResourceMapType {

  alias: Alias[];

  constructor(resourceMapType: ResourceMapType) {
    super(resourceMapType);

    this.alias = resourceMapType.alias;
  }
}

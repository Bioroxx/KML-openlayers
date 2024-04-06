import {AbstractObjectGroup, ResourceMapType} from '@bioroxx/kmljs';
import {Alias} from './alias';

export class ResourceMap extends AbstractObjectGroup implements ResourceMapType {

  alias: Alias[];

  constructor(resourceMapType: ResourceMapType) {
    super(resourceMapType);

    this.alias = resourceMapType.alias;
  }
}

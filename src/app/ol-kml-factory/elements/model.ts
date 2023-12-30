import {ModelType} from 'kmljs';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {ResourceMap} from './resource-map';
import {Link} from './link';
import {Scale} from './scale';
import {Orientation} from './orientation';
import {AltitudeModeGroup} from './altitude-mode-group';
import {Location} from './location';

export class Model extends AbstractGeometryGroup implements ModelType {

  altitudeMode?: AltitudeModeGroup;
  location?: Location;
  orientation?: Orientation;
  scale?: Scale;
  link?: Link;
  resourceMap?: ResourceMap;

  constructor(modelType: ModelType) {
    super(modelType);

    this.altitudeMode = modelType.altitudeMode;
    this.location = modelType.location;
    this.orientation = modelType.orientation;
    this.scale = modelType.scale;
    this.link = modelType.link;
    this.resourceMap = modelType.resourceMap;
  }
}

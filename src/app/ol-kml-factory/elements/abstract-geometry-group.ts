import {AbstractObjectGroup} from './abstract-object-group';
import {AbstractGeometryType} from '@bioroxx/kmljs';
import {OlGeometry} from '../helper/ol-types';

export abstract class AbstractGeometryGroup extends AbstractObjectGroup implements AbstractGeometryType {

  olGeometry?: OlGeometry;

  constructor(abstractGeometryType: AbstractGeometryType) {
    super(abstractGeometryType);
  }

}

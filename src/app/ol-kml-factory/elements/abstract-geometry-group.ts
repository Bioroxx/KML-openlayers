import {AbstractGeometryType, AbstractObjectGroup} from '@bioroxx/kmljs';
import {OlGeometry} from '../helper/ol-types';

export abstract class AbstractGeometryGroup extends AbstractObjectGroup implements AbstractGeometryType {

  abstract olGeometry?: OlGeometry;

  protected constructor(abstractGeometryType: AbstractGeometryType) {
    super(abstractGeometryType);
  }

}

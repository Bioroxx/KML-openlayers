import {MultiGeometryType} from '@bioroxx/kmljs';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {OlGeometryCollection} from '../helper/ol-types';

export class MultiGeometry extends AbstractGeometryGroup implements MultiGeometryType {

  geometry: AbstractGeometryGroup[];

  override olGeometry?: OlGeometryCollection;

  constructor(multiGeometryType: MultiGeometryType) {
    super(multiGeometryType);
    this.geometry = multiGeometryType.geometry;
  }
}

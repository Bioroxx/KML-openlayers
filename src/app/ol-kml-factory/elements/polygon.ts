import {PolygonType} from 'kmljs';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {AltitudeModeGroup} from './altitude-mode-group';
import {Boundary} from '../helper/boundary';
import {OlPolygon} from '../helper/ol-types';

export class Polygon extends AbstractGeometryGroup implements PolygonType {

  extrude?: boolean;
  tessellate?: boolean;
  altitudeMode?: AltitudeModeGroup;
  outerBoundaryIs?: Boundary;
  innerBoundaryIs?: Boundary[];

  override olGeometry?: OlPolygon;

  constructor(polygonType: PolygonType) {
    super(polygonType);

    this.extrude = polygonType.extrude;
    this.tessellate = polygonType.tessellate;
    this.altitudeMode = polygonType.altitudeMode;
    this.outerBoundaryIs = polygonType.outerBoundaryIs;
    this.innerBoundaryIs = polygonType.innerBoundaryIs;
  }
}

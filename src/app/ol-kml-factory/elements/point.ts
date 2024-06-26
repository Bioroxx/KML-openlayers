import {AltitudeModeGroup, CoordinatesType, PointType} from '@bioroxx/kmljs';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {Point as OlPoint} from 'ol/geom';

export class Point extends AbstractGeometryGroup implements PointType {

  extrude: boolean;
  altitudeMode: AltitudeModeGroup;
  coordinates: CoordinatesType;

  override olGeometry?: OlPoint;

  constructor(pointType: PointType) {
    super(pointType);

    this.extrude = pointType.extrude;
    this.altitudeMode = pointType.altitudeMode;
    this.coordinates = pointType.coordinates;
  }
}

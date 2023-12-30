import {CoordinatesType, LinearRingType} from 'kmljs';
import {AltitudeModeGroup} from './altitude-mode-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {LinearRing as OlLinearRing} from 'ol/geom';

export class LinearRing extends AbstractGeometryGroup implements LinearRingType {

  extrude?: boolean;
  tessellate?: boolean;
  altitudeMode?: AltitudeModeGroup;
  coordinates?: CoordinatesType;

  override olGeometry?: OlLinearRing;

  constructor(linearRingType: LinearRingType) {
    super(linearRingType);

    this.extrude = linearRingType.extrude;
    this.tessellate = linearRingType.tessellate;
    this.altitudeMode = linearRingType.altitudeMode;
    this.coordinates = linearRingType.coordinates;
  }
}

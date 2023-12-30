import {CoordinatesType, LineStringType} from 'kmljs';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {AltitudeModeGroup} from './altitude-mode-group';
import {OlLineString} from '../helper/ol-types';

export class LineString extends AbstractGeometryGroup implements LineStringType {

  extrude?: boolean;
  tessellate?: boolean;
  altitudeMode?: AltitudeModeGroup;
  coordinates?: CoordinatesType;

  override olGeometry?: OlLineString;

  constructor(lineStringType: LineStringType) {
    super(lineStringType);

    this.extrude = lineStringType.extrude;
    this.tessellate = lineStringType.tessellate;
    this.altitudeMode = lineStringType.altitudeMode;
    this.coordinates = lineStringType.coordinates;
  }
}

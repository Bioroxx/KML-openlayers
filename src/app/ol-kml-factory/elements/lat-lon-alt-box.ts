import {LatLonAltBoxType} from '@bioroxx/kmljs';
import {AbstractLatLonBox} from './abstract-lat-lon-box';
import {AltitudeModeGroup} from './altitude-mode-group';

export class LatLonAltBox extends AbstractLatLonBox implements LatLonAltBoxType {

  minAltitude?: number;
  maxAltitude?: number;
  altitudeMode?: AltitudeModeGroup;

  constructor(latLonAltBoxType: LatLonAltBoxType) {
    super(latLonAltBoxType);

    this.minAltitude = latLonAltBoxType.minAltitude;
    this.maxAltitude = latLonAltBoxType.maxAltitude;
    this.altitudeMode = latLonAltBoxType.altitudeMode;
  }
}

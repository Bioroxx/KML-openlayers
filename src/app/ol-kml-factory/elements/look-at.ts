import {AltitudeModeGroup, Angle180Type, Angle360Type, Angle90Type, LookAtType} from 'kmljs';
import {AbstractViewGroup} from './abstract-view-group';

export class LookAt extends AbstractViewGroup implements LookAtType {

  longitude?: Angle180Type;
  latitude?: Angle90Type;
  altitude?: number;
  heading?: Angle360Type;
  tilt?: Angle180Type;
  range?: number;
  altitudeMode?: AltitudeModeGroup;

  constructor(lookAtType: LookAtType) {
    super(lookAtType);

    this.longitude = lookAtType.longitude;
    this.latitude = lookAtType.latitude;
    this.altitude = lookAtType.altitude;
    this.heading = lookAtType.heading;
    this.tilt = lookAtType.tilt;
    this.range = lookAtType.range;
    this.altitudeMode = lookAtType.altitudeMode;
  }
}

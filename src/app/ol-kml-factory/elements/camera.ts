import {Angle180Type, Angle360Type, Angle90Type, CameraType} from '@bioroxx/kmljs';
import {AbstractViewGroup} from './abstract-view-group';
import {AltitudeModeGroup} from './altitude-mode-group';

export class Camera extends AbstractViewGroup implements CameraType {

  longitude?: Angle180Type;
  latitude?: Angle90Type;
  altitude?: number;
  heading?: Angle360Type;
  tilt?: Angle180Type;
  roll?: Angle180Type;
  altitudeMode?: AltitudeModeGroup;

  constructor(cameraType: CameraType) {
    super(cameraType);

    this.longitude = cameraType.longitude;
    this.latitude = cameraType.latitude;
    this.altitude = cameraType.altitude;
    this.heading = cameraType.heading;
    this.tilt = cameraType.tilt;
    this.roll = cameraType.roll;
    this.altitudeMode = cameraType.altitudeMode;
  }

}

import {Angle180Type, Angle360Type, OrientationType} from '@bioroxx/kmljs';
import {AbstractObjectGroup} from './abstract-object-group';

export class Orientation extends AbstractObjectGroup implements OrientationType {

  heading?: Angle360Type;
  tilt?: Angle180Type;
  roll?: Angle360Type;

  constructor(orientationType: OrientationType) {
    super(orientationType);

    this.heading = orientationType.heading;
    this.tilt = orientationType.tilt;
    this.roll = orientationType.roll;
  }
}

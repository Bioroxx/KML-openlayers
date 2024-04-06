import {AbstractObjectGroup, Angle180Type, Angle90Type, LocationType} from '@bioroxx/kmljs';

export class Location extends AbstractObjectGroup implements LocationType {

  longitude?: Angle180Type;
  latitude?: Angle90Type;
  altitude?: number;

  constructor(locationType: LocationType) {
    super(locationType);

    this.longitude = locationType.longitude;
    this.latitude = locationType.latitude;
    this.altitude = locationType.altitude;
  }
}

import {Angle180Type, LatLonBoxType} from '@bioroxx/kmljs';
import {AbstractLatLonBox} from './abstract-lat-lon-box';

export class LatLonBox extends AbstractLatLonBox implements LatLonBoxType {

  rotation?: Angle180Type;

  constructor(latLonBoxType: LatLonBoxType) {
    super(latLonBoxType);

    this.rotation = latLonBoxType.rotation;
  }
}

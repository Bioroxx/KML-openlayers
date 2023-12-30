import {AbstractObjectGroup} from './abstract-object-group';
import {AbstractLatLonBoxType, Angle180Type} from 'kmljs';

export abstract class AbstractLatLonBox extends AbstractObjectGroup implements AbstractLatLonBoxType {

  north?: Angle180Type;
  south?: Angle180Type;
  east?: Angle180Type;
  west?: Angle180Type;

  constructor(abstractLatLonBoxType: AbstractLatLonBoxType) {
    super(abstractLatLonBoxType);

    this.north = abstractLatLonBoxType.north;
    this.south = abstractLatLonBoxType.south;
    this.east = abstractLatLonBoxType.east;
    this.west = abstractLatLonBoxType.west;
  }

}

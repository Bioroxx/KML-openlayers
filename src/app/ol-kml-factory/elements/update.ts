import {AnyURI, UpdateType} from 'kmljs';
import {Delete} from './delete';
import {Create} from './create';
import {Change} from './change';

export class Update implements UpdateType {

  targetHref: AnyURI;
  createDeleteChange?: Create | Delete | Change;

  constructor(updateType: UpdateType) {
    this.targetHref = updateType.targetHref;
    this.createDeleteChange = updateType.createDeleteChange;
  }
}

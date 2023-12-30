import {ChangeType} from 'kmljs';
import {AbstractObjectGroup} from './abstract-object-group';

export class Change implements ChangeType {

  object: AbstractObjectGroup[];

  constructor(changeType: ChangeType) {
    this.object = changeType.object;
  }

}

import {AbstractObjectGroup, ChangeType} from '@bioroxx/kmljs';

export class Change implements ChangeType {

  object: AbstractObjectGroup[];

  constructor(changeType: ChangeType) {
    this.object = changeType.object;
  }

}

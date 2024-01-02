import {AbstractObjectType, ID, NCName} from '@bioroxx/kmljs';

export abstract class AbstractObjectGroup implements AbstractObjectType {

  id?: ID;
  targetId?: NCName;

  constructor(abstractObjectTypeValues: AbstractObjectType) {
    this.id = abstractObjectTypeValues.id;
    this.targetId = abstractObjectTypeValues.id;
  }

}

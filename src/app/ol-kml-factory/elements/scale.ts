import {AbstractObjectGroup, ScaleType} from '@bioroxx/kmljs';

export class Scale extends AbstractObjectGroup implements ScaleType {

  x?: number;
  y?: number;
  z?: number;

  constructor(scaleType: ScaleType) {
    super(scaleType);

    this.x = scaleType.x;
    this.y = scaleType.y;
    this.z = scaleType.z;
  }
}

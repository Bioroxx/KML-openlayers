import {AbstractObjectGroup, LodType} from '@bioroxx/kmljs';

export class Lod extends AbstractObjectGroup implements LodType {

  minLodPixels?: number;
  maxLodPixels?: number;
  minFadeExtent?: number;
  maxFadeExtent?: number;

  constructor(lodType: LodType) {
    super(lodType);

    this.minLodPixels = lodType.minLodPixels;
    this.maxLodPixels = lodType.maxLodPixels;
    this.minFadeExtent = lodType.minFadeExtent;
    this.maxFadeExtent = lodType.maxFadeExtent;
  }
}

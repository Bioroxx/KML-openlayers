import {AbstractObjectGroup, GridOriginEnumType, ImagePyramidType} from '@bioroxx/kmljs';

export class ImagePyramid extends AbstractObjectGroup implements ImagePyramidType {

  tileSize?: number;
  maxWidth?: number;
  maxHeight?: number;
  gridOrigin?: GridOriginEnumType;

  constructor(imagePyramidType: ImagePyramidType) {
    super(imagePyramidType);

    this.tileSize = imagePyramidType.tileSize;
    this.maxWidth = imagePyramidType.maxWidth;
    this.maxHeight = imagePyramidType.maxHeight;
    this.gridOrigin = imagePyramidType.gridOrigin;
  }
}

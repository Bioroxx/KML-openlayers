import {Angle180Type, PhotoOverlayType, ShapeEnumType} from 'kmljs';
import {AbstractOverlayGroup} from './abstract-overlay-group';
import {Point} from './point';
import {ImagePyramid} from './image-pyramid';
import {ViewVolume} from './view-volume';

// @ts-ignore
export class PhotoOverlay extends AbstractOverlayGroup implements PhotoOverlayType {

  rotation?: Angle180Type;
  viewVolume?: ViewVolume;
  imagePyramid?: ImagePyramid;
  point?: Point;
  shape?: ShapeEnumType;

  constructor(photoOverlayType: PhotoOverlayType) {
    super(photoOverlayType);

    this.rotation = photoOverlayType.rotation;
    this.viewVolume = photoOverlayType.viewVolume;
    this.imagePyramid = photoOverlayType.imagePyramid;
    this.point = photoOverlayType.point;
    this.shape = photoOverlayType.shape;
  }
}

import {Angle180Type, ScreenOverlayType, Vec2Type} from '@bioroxx/kmljs';
import {AbstractOverlayGroup} from './abstract-overlay-group';

export class ScreenOverlay extends AbstractOverlayGroup implements ScreenOverlayType {

  overlayXY?: Vec2Type;
  screenXY?: Vec2Type;
  rotationXY?: Vec2Type;
  size?: Vec2Type;
  rotation?: Angle180Type;

  constructor(screenOverlayType: ScreenOverlayType) {
    super(screenOverlayType);

    this.overlayXY = screenOverlayType.overlayXY;
    this.screenXY = screenOverlayType.screenXY;
    this.rotationXY = screenOverlayType.rotationXY;
    this.size = screenOverlayType.size;
    this.rotation = screenOverlayType.rotation;
  }

  override get isRendered(): boolean {
    return false;
  }

  override render = () => {

  }

  override unRender = () => {

  }
}

import {Angle180Type, ScreenOverlayType, Vec2Type} from '@bioroxx/kmljs';
import {AbstractOverlayGroup} from './abstract-overlay-group';
import BaseLayer from 'ol/layer/Base';

export class ScreenOverlay extends AbstractOverlayGroup implements ScreenOverlayType {

  overlayXY?: Vec2Type;
  screenXY?: Vec2Type;
  rotationXY?: Vec2Type;
  size?: Vec2Type;
  rotation?: Angle180Type;

  olLayer: BaseLayer;

  constructor(screenOverlayType: ScreenOverlayType) {
    super(screenOverlayType);

    this.overlayXY = screenOverlayType.overlayXY;
    this.screenXY = screenOverlayType.screenXY;
    this.rotationXY = screenOverlayType.rotationXY;
    this.size = screenOverlayType.size;
    this.rotation = screenOverlayType.rotation;
  }

  override get isVisible(): boolean {
    return this.olLayer.getVisible();
  }

  override setVisible = () => {
    this.olLayer.setVisible(true);
  }

  override setInvisible = () => {
    this.olLayer.setVisible(false);
  }
}

import {GroundOverlayType} from '@bioroxx/kmljs';
import {AbstractOverlayGroup} from './abstract-overlay-group';
import {AltitudeModeGroup} from './altitude-mode-group';
import {LatLonBox} from './lat-lon-box';
import BaseLayer from 'ol/layer/Base';

export class GroundOverlay extends AbstractOverlayGroup implements GroundOverlayType {

  altitude?: number;
  altitudeMode?: AltitudeModeGroup;
  latLonBox?: LatLonBox;

  olLayer: BaseLayer;

  constructor(groundOverlayType: GroundOverlayType) {
    super(groundOverlayType);

    this.altitude = groundOverlayType.altitude;
    this.altitudeMode = groundOverlayType.altitudeMode;
    this.latLonBox = groundOverlayType.latLonBox;
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

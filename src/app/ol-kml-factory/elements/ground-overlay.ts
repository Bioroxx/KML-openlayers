import {GroundOverlayType} from '@bioroxx/kmljs';
import {AbstractOverlayGroup} from './abstract-overlay-group';
import {AltitudeModeGroup} from './altitude-mode-group';
import {LatLonBox} from './lat-lon-box';

export class GroundOverlay extends AbstractOverlayGroup implements GroundOverlayType {

  altitude?: number;
  altitudeMode?: AltitudeModeGroup;
  latLonBox?: LatLonBox;

  constructor(groundOverlayType: GroundOverlayType) {
    super(groundOverlayType);

    this.altitude = groundOverlayType.altitude;
    this.altitudeMode = groundOverlayType.altitudeMode;
    this.latLonBox = groundOverlayType.latLonBox;
  }

  override get isRendered(): boolean {
    return false;
  }

  override render = () => {

  }

  override unRender = () => {

  }
}

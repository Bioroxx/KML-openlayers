import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractOverlayType, ColorType} from '@bioroxx/kmljs';
import {Icon} from './icon';

export abstract class AbstractOverlayGroup extends AbstractFeatureGroup implements AbstractOverlayType {

  color?: ColorType;
  drawOrder?: number;
  icon?: Icon;

  constructor(abstractOverlayType: AbstractOverlayType) {
    super(abstractOverlayType);

    this.color = abstractOverlayType.color;
    this.drawOrder = abstractOverlayType.drawOrder;
    this.icon = abstractOverlayType.icon;
  }
}

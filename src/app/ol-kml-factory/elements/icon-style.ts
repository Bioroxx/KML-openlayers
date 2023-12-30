import {Angle360Type, BasicLinkType, IconStyleType, Vec2Type} from 'kmljs';
import {AbstractColorStyleGroup} from './abstract-color-style-group';

export class IconStyle extends AbstractColorStyleGroup implements IconStyleType {

  scale?: number;
  heading?: Angle360Type;
  icon?: BasicLinkType;
  hotSpot?: Vec2Type;
  
  constructor(iconStyleType: IconStyleType) {
    super(iconStyleType);

    this.scale = iconStyleType.scale;
    this.heading = iconStyleType.heading;
    this.icon = iconStyleType.icon;
    this.hotSpot = iconStyleType.hotSpot;
  }
}

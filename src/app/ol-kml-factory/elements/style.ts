import {StyleType} from '@bioroxx/kmljs';
import {AbstractStyleSelectorGroup} from './abstract-style-selector-group';
import {ListStyle} from './list-style';
import {BalloonStyle} from './balloon-style';
import {PolyStyle} from './poly-style';
import {LineStyle} from './line-style';
import {LabelStyle} from './label-style';
import {IconStyle} from './icon-style';
import {OlStyle} from '../helper/ol-types';

export class Style extends AbstractStyleSelectorGroup implements StyleType {

  iconStyle?: IconStyle;
  labelStyle?: LabelStyle;
  lineStyle?: LineStyle;
  polyStyle?: PolyStyle;
  balloonStyle?: BalloonStyle;
  listStyle?: ListStyle;

  olStyle?: OlStyle;

  constructor(styleType: StyleType) {
    super(styleType);

    this.iconStyle = styleType.iconStyle;
    this.labelStyle = styleType.labelStyle;
    this.lineStyle = styleType.lineStyle;
    this.polyStyle = styleType.polyStyle;
    this.balloonStyle = styleType.balloonStyle;
    this.listStyle = styleType.listStyle;
  }
}

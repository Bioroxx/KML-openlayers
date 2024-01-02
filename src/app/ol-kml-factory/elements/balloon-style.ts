import {BalloonStyleType, ColorType, DisplayModeEnumType} from '@bioroxx/kmljs';
import {AbstractSubStyleGroup} from './abstract-sub-style-group';

export class BalloonStyle extends AbstractSubStyleGroup implements BalloonStyleType {

  bgColor?: ColorType;
  textColor?: ColorType;
  text?: string;
  displayMode?: DisplayModeEnumType;

  constructor(balloonStyleType: BalloonStyleType) {
    super(balloonStyleType);

    this.bgColor = balloonStyleType.bgColor;
    this.textColor = balloonStyleType.textColor;
    this.text = balloonStyleType.text;
    this.displayMode = balloonStyleType.displayMode;
  }

}

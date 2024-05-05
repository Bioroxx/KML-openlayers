import {OlControl} from './ol-types';
import {BalloonStyleType, DisplayModeEnumType} from '@bioroxx/kmljs';
import {colorTypeToCSSRGBAString} from './util';

export class BalloonControl extends OlControl {

  constructor(style: BalloonStyleType) {

    const element = document.createElement('div');

    if (style.displayMode === DisplayModeEnumType.default) {

      let inlineStyle = 'right: 0; margin: 1.0rem; padding: 1.0rem; border: 1px solid grey; max-height: 50%; width: 30%; overflow: auto; ';
      inlineStyle += 'background-color: ' + colorTypeToCSSRGBAString(style.bgColor) + '; ';
      inlineStyle += 'color: ' + colorTypeToCSSRGBAString(style.textColor) + '; ';

      element.className = 'ol-unselectable ol-control';
      element.innerHTML = style.text;
      element.setAttribute('style', inlineStyle);
    }

    super({
      element: element
    });
  }
}

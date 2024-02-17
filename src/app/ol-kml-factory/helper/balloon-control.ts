import {OlControl} from './ol-types';

export class BalloonControl extends OlControl {

  constructor(content: string) {

    const inlineStyle = 'right: 0; margin: 1.0rem; padding: 1.0rem; background-color: white; border: 1px solid grey; height: 50%; width: 30%; overflow: auto';
    const element = document.createElement('div');
    element.className = 'ol-unselectable ol-control';
    element.setAttribute('style', inlineStyle);
    element.innerHTML = content;

    super({
      element: element,
    });
  }

}
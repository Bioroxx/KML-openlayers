import {PlacemarkType} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {OlVectorLayer, OlVectorSource} from '../helper/ol-types';

export class Placemark extends AbstractFeatureGroup implements PlacemarkType {

  geometry?: AbstractGeometryGroup;

  override olLayer: OlVectorLayer<OlVectorSource>;

  constructor(placemarkType: PlacemarkType) {
    super(placemarkType);

    this.geometry = placemarkType.geometry;
  }

  get type() {
    return 'placemark';
  }

  get label() {
    return this.name;
  }

  get data() {
    return this;
  }

  get children() {
    return [];
  };

  get expanded() {
    return false;
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

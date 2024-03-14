import {PlacemarkType} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import BaseLayer from 'ol/layer/Base';

export class Placemark extends AbstractFeatureGroup implements PlacemarkType {

  geometry?: AbstractGeometryGroup;

  override olLayer: BaseLayer;

  constructor(placemarkType: PlacemarkType) {
    super(placemarkType);

    this.geometry = placemarkType.geometry;
  }

  get label() {
    return this.name;
  }

  get data() {
    return this;
  }

  get type() {
    return 'placemark';
  }

  get children() {
    return [];
  };

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

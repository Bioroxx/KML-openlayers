import {PlacemarkType} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {OlFeature, OlMap, OlSelect, OlVectorLayer, OlVectorSource} from '../helper/ol-types';
import {BalloonControl} from '../helper/balloon-control';

export class Placemark extends AbstractFeatureGroup implements PlacemarkType {

  geometry?: AbstractGeometryGroup;

  olMap: OlMap;
  olVectorSource: OlVectorSource;
  olVectorLayer: OlVectorLayer<OlVectorSource>;
  olFeature: OlFeature;
  olSelect: OlSelect;

  balloonControl?: BalloonControl;

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

  override addLayer = () => {
    this.olMap.addLayer(this.olVectorLayer);
    this.olMap.addInteraction(this.olSelect);
  }

  override removeLayer = () => {
    this.onDeselected();
    this.olMap.removeInteraction(this.olSelect);
    this.olMap.removeLayer(this.olVectorLayer);
  }

  override get isVisible(): boolean {
    return this.olVectorLayer.getVisible();
  }

  override setVisible = () => {
    this.olVectorLayer.setVisible(true);
  }

  override setInvisible = () => {
    this.onDeselected();
    this.olVectorLayer.setVisible(false);
  }

  onSelected() {
    if (this.balloonControl) {
      this.olMap.addControl(this.balloonControl);
    }
  };

  onDeselected() {
    if (this.balloonControl) {
      this.olMap.removeControl(this.balloonControl);
    }
  }
}

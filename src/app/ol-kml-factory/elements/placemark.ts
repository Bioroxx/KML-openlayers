import {PlacemarkType} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {v4 as uuidv4} from 'uuid';
import {LAYER_ID_KEY} from '../ol-render';
import {OlFeature, OlMap, OlSelect, OlVectorLayer, OlVectorSource} from '../helper/ol-types';
import {BalloonControl} from '../helper/balloon-control';

export class Placemark extends AbstractFeatureGroup implements PlacemarkType {

  geometry?: AbstractGeometryGroup;

  readonly featureId = uuidv4();
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

  override get isRendered(): boolean {
    return this.olMap.getLayers()
        .getArray()
        .some(layer => layer.get(LAYER_ID_KEY) === this.featureId)
  }

  override render = () => {
    this.olMap.addLayer(this.olVectorLayer);
    this.olMap.addInteraction(this.olSelect);
  }

  override unRender = () => {
    this.olMap.removeInteraction(this.olSelect);
    this.olMap.removeLayer(this.olVectorLayer);
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

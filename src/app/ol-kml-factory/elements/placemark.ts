import {PlacemarkType} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Feature as OlFeature} from 'ol';
import {v4 as uuidv4} from 'uuid';
import {LAYER_ID_KEY} from '../ol-render';

export class Placemark extends AbstractFeatureGroup implements PlacemarkType {

  geometry?: AbstractGeometryGroup;

  olMap: Map;
  olFeature?: OlFeature;

  constructor(placemarkType: PlacemarkType) {
    super(placemarkType);

    this.geometry = placemarkType.geometry;
  }

  renderId = uuidv4();

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
    return !!this.getRenderedLayer()
  }

  override render = () => {

    if (!this.olFeature) {
      return;
    }

    const vectorSource = new VectorSource({features: [this.olFeature]});
    const vectorLayer = new VectorLayer({source: vectorSource});
    vectorLayer.set(LAYER_ID_KEY, this.renderId);
    this.olMap.addLayer(vectorLayer);
  }

  override unRender = () => {

    const layerToRemove = this.getRenderedLayer();

    if (!layerToRemove) {
      return;
    }

    this.olMap.removeLayer(layerToRemove);
  }

  private getRenderedLayer() {
    return this.olMap.getLayers()
      .getArray()
      .find(layer => layer.get(LAYER_ID_KEY) === this.renderId);
  }

}

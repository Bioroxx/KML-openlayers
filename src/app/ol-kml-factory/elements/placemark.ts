import {PlacemarkType} from 'kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import {OlRender} from '../ol-render';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Feature as OlFeature} from 'ol';

export class Placemark extends AbstractFeatureGroup implements PlacemarkType, OlRender {

  geometry?: AbstractGeometryGroup;

  olMap: Map;
  olFeature?: OlFeature;

  constructor(placemarkType: PlacemarkType) {
    super(placemarkType);

    this.geometry = placemarkType.geometry;
  }

  render(): void {

    if (!this.olFeature) {
      return;
    }

    const vectorSource = new VectorSource({features: [this.olFeature]});
    const vectorLayer = new VectorLayer({source: vectorSource});
    this.olMap.addLayer(vectorLayer);
  }
}

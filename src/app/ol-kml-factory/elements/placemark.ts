import {PlacemarkType} from 'kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {AbstractGeometryGroup} from './abstract-geometry-group';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Feature as OlFeature} from 'ol';

export class Placemark extends AbstractFeatureGroup implements PlacemarkType {

  geometry?: AbstractGeometryGroup;

  olMap: Map;
  olFeature?: OlFeature;

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

  override render = () => {

    if (!this.olFeature) {
      return;
    }

    const vectorSource = new VectorSource({features: [this.olFeature]});
    const vectorLayer = new VectorLayer({source: vectorSource});
    this.olMap.addLayer(vectorLayer);
  }
}

import {Component, Input} from '@angular/core';
import Map from 'ol/Map';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

@Component({
  selector: 'app-layer-tree',
  templateUrl: './layer-tree.component.html',
  styleUrls: ['./layer-tree.component.scss']
})
export class LayerTreeComponent {

  _map: Map;

  @Input()
  set map(value: Map) {

    console.log('Set map: ', value);

    if (!value) {
      return;
    }

    this._map = value;
    //this._map.getView().on('change', this.render);
  }

  render() {

    const vectorLayers = this.map.getLayers().getArray().filter(l => l instanceof VectorLayer) as VectorLayer<any>[];

    const vectorLayer = vectorLayers[0];

    if (!vectorLayer) {
      return;
    }

    const source = vectorLayer.getSource() as VectorSource;

    if (!source) {
      return;
    }

    const features = source.getFeatures();

    console.log('Render');
  }
}

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {View} from "ol";
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import Map, {MapOptions} from "ol/Map";
import {OpenLayersMapComponent} from "./module/open-layers/component/open-layers-map/open-layers-map.component";
import {fromLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {KML} from "ol/format";
import {Geometry} from "ol/geom";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(OpenLayersMapComponent) openLayersMapComponent: OpenLayersMapComponent;

  instance: Map;
  kmlLayers: VectorLayer<VectorSource<Geometry>>[] = [];

  mapOptions: MapOptions = {
    layers: [
      new TileLayer({
        source: new OSM(),
      })
    ],
    target: 'map',
    view: new View({
      center: [0, 0],
      zoom: 2,
      maxZoom: 18
    })
  }

  ngAfterViewInit() {
    this.instance = this.openLayersMapComponent.getMapInstance();
    this.zoomIntoVienna();

    const l = 'https://data.wien.gv.at/daten/geo?version=1.3.0&service=WMS&request=GetMap&crs=EPSG:4326&bbox=48.10,16.16,48.34,16.59&width=1&height=1&layers=ogdwien:BEZIRKSGRENZEOGD&styles=&format=application/vnd.google-earth.kml+xml'

    // this.addKMLLayer(l);
  }

  addKMLLayer(name: string, url: string) {
    const vectorLayer = new VectorLayer({
      opacity: 0.3,
      className: name,
      source: new VectorSource({
        url,
        format: new KML(),
      }),
    });

    //this.instance.addLayer(vectorLayer);
    this.kmlLayers = this.kmlLayers.concat([vectorLayer]);
  }

  zoomIntoVienna() {
    const coordinate = fromLonLat([16.363449, 48.210033]);
    this.instance.getView().setCenter(coordinate);
    this.instance.getView().setZoom(12);
  }

  protected readonly JSON = JSON;
}

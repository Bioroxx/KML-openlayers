import {AfterViewInit, Component} from '@angular/core';
import {MapBrowserEvent, View} from "ol";
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import Map, {MapOptions} from "ol/Map";
import {fromLonLat, toLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {KML} from "ol/format";
import {Coordinate} from "ol/coordinate";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  private readonly COORDINATE_VIENNA = fromLonLat([16.363449, 48.210033]);

  map: Map;

  lastMouseCoordinate: Coordinate;
  lastMouseClickedCoordinate: Coordinate;

  constructor() {

    const mapOptions: MapOptions = {
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      view: new View()
    }

    this.map = new Map(mapOptions);
    this.registerEventListeners();
  }

  ngAfterViewInit() {
    this.zoomIntoVienna();
  }

  addKMLLayer(name: string, url: string) {
    const vectorLayer = new VectorLayer({
      opacity: 1.0,
      className: name,
      source: new VectorSource({
        url,
        format: new KML(),
      }),
    });

    vectorLayer.set('name', name);
    this.map.addLayer(vectorLayer);
  }

  addVectorLayer(vectorLayer: VectorLayer<VectorSource>) {
    this.map.addLayer(vectorLayer);
  }

  zoomIntoVienna() {
    this.map.getView().setCenter(this.COORDINATE_VIENNA);
    this.map.getView().setZoom(12);
  }

  registerEventListeners() {

    this.map.getView().on('change', (v) => {
      console.log('View change', v);
    });

    this.map.on('loadstart', (v) => {
      console.log('LoadStart', v);
    });

    this.map.on('loadend', (v) => {
      console.log('LoadEnd', v);
    });

    this.map.on('pointermove', (event: MapBrowserEvent<any>) => {
      if (event.dragging) {
        return;
      }
      this.lastMouseCoordinate = toLonLat(event.coordinate);
    });

    this.map.on('click', (event: MapBrowserEvent<any>) => {
      if (event.dragging) {
        return;
      }
      this.lastMouseClickedCoordinate = toLonLat(event.coordinate);
    });
  }
}

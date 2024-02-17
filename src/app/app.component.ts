import {AfterViewInit, Component} from '@angular/core';
import {MapBrowserEvent, View} from "ol";
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import Map, {MapOptions} from "ol/Map";
import {fromLonLat, toLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Coordinate} from "ol/coordinate";
import {KmlFileService} from './service/kml-file.service';
import {KMLParser} from '@bioroxx/kmljs';
import {Kml} from './ol-kml-factory/elements/kml';
import {OlKmlFactory} from './ol-kml-factory/ol-kml-factory';
import {TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from './ol-kml-factory/elements/abstract-feature-group';
import {KmljsOlFormat} from './ol-kml-factory/kmljs-ol-format';

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

  treeRootNode: TreeNode<AbstractFeatureGroup>[];

  constructor(private kmlFileService: KmlFileService) {

    const mapOptions: MapOptions = {
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      view: new View()
    }

    this.map = new Map(mapOptions);
    //this.registerEventListeners();
  }

  ngAfterViewInit() {
    this.zoomIntoVienna();
    this.parseKML();
    this.addKMLLayer();
  }

  parseKML() {

    const simplePlacemark = './assets/kml-files/basic/placemark-vienna-first-district.kml';
    const fullPlacemark = './assets/kml-files/BEZIRKSGRENZEOGD.kml'

    const kmlFactory = new OlKmlFactory(this.map);
    const kmlParser = new KMLParser(kmlFactory);
    this.kmlFileService.getFileContentString(fullPlacemark).subscribe(kmlString => {

      const kml: Kml = kmlParser.parse(kmlString)!;
      this.treeRootNode = [kml.feature! as TreeNode<AbstractFeatureGroup>];

      console.log(kml);
    });
  }

  addKMLLayer() {

    const url = './assets/kml-files/basic/placemark-vienna-first-district.kml'

    const vectorLayer = new VectorLayer({
      opacity: 1.0,
      source: new VectorSource({
        url,
        format: new KmljsOlFormat(),
      }),
    });

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

      const layers = this.map.getLayers().getArray();

      const vectorLayers = layers.filter(l => l instanceof VectorLayer) as VectorLayer<any>[];

      const vectorLayer = vectorLayers[0];

      if (!vectorLayer) {
        return;
      }

      const source = vectorLayer.getSource() as VectorSource;

      if (!source) {
        return;
      }

      const features = source.getFeatures();
    });

    this.map.on('loadstart', (v) => {
      //console.log('LoadStart', v);
    });

    this.map.on('loadend', (v) => {
      //console.log('LoadEnd', v);
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

import {AfterViewInit, Component} from '@angular/core';
import {View} from "ol";
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import Map, {MapOptions} from "ol/Map";
import {fromLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {KmlFileService} from './service/kml-file.service';
import {KMLParser} from '@bioroxx/kmljs';
import {Kml} from './ol-kml-factory/elements/kml';
import {OlKmlFactory} from './ol-kml-factory/ol-kml-factory';
import {KML} from 'ol/format';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  private readonly defaultDatasetFilePath = '/assets/kml/vienna-districts.kml';
  private readonly viennaCoordinate = fromLonLat([16.363449, 48.210033]);

  map: Map;
  kml?: Kml;

  constructor(private kmlFileService: KmlFileService) {

    const mapOptions: MapOptions = {
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      view: new View({
        center: this.viennaCoordinate,
        zoom: 11,
      }),
    }

    this.map = new Map(mapOptions);
  }

  ngAfterViewInit() {
    this.kmlFileService.getFileContentString(this.defaultDatasetFilePath)
        .subscribe((v) => this.importWithKmljs(v));
  }

  importWithKmljs(kmlString: string) {

    this.clear();

    const kmlFactory = new OlKmlFactory();
    const kmlParser = new KMLParser(kmlFactory);

    const kml = kmlParser.parse(kmlString);

    if (kml instanceof Kml) {
      this.kml = kml;
      const kmlLayer = this.kml.getLayer();
      if (kmlLayer) {
        this.map.addLayer(kmlLayer);
      }
    }
  }

  importWithOpenLayers(kmlString: string) {

    this.clear();

    const kmlParser = new KML();
    const features = kmlParser.readFeatures(kmlString, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });

    const vector = new VectorLayer({
      source: new VectorSource({
        features: features
      }),
    });

    this.map.addLayer(vector);
  }

  removeAdditionalLayersFromMap() {
    const vectorLayers = this.map.getLayers().getArray().filter(l => !(l instanceof TileLayer));
    vectorLayers.forEach((l) => this.map.removeLayer(l));
  }

  clear() {
    this.removeAdditionalLayersFromMap();
    this.kml = undefined;
  }
}

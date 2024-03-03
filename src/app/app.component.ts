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
import {BalloonControl} from './ol-kml-factory/helper/balloon-control';
import {OlSelect} from './ol-kml-factory/helper/ol-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  private readonly viennaCoordinate = fromLonLat([16.363449, 48.210033]);

  map: Map;
  kml: Kml;

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
    this.importDefaultDataSet();
  }

  importKml(kmlString: string) {

    const kmlFactory = new OlKmlFactory(this.map);
    const kmlParser = new KMLParser(kmlFactory);

    const kml = kmlParser.parse(kmlString);

    if (kml instanceof Kml) {
      this.kml = kml;
      kml.addLayer();
    }
  }

  importKmlWithOpenLayersDefaultImplementation(kmlString: string) {

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

  clearMapFromAdditionalLayers() {
    const vectorLayers = this.map.getLayers().getArray().filter(l => !(l instanceof TileLayer));
    const interactions = this.map.getInteractions().getArray().filter((i) => i instanceof OlSelect);
    const controls = this.map.getControls().getArray().filter((c) => c instanceof BalloonControl);

    console.log('VectorLayers', vectorLayers);
    console.log('Interactions', interactions);
    console.log('Controls', controls);

    vectorLayers.forEach((l) => this.map.removeLayer(l));
    interactions.forEach((i) => this.map.removeInteraction(i));
    controls.forEach((c) => this.map.removeControl(c));
  }

  importDefaultDataSet() {

    const vienneDistricts = './assets/kml/BEZIRKSGRENZEOGD.kml'

    const kmlFactory = new OlKmlFactory(this.map);
    const kmlParser = new KMLParser(kmlFactory);

    this.kmlFileService.getFileContentString(vienneDistricts).subscribe(kmlString => {
      const kml = kmlParser.parse(kmlString);

      if (kml && kml instanceof Kml) {
        this.kml = kml;
        kml.addLayer();
      }
    });
  }

  zoomIntoVienna() {
    this.map.getView().setCenter(this.viennaCoordinate);
    this.map.getView().setZoom(12);
  }
}

import {Component, EventEmitter, Output} from '@angular/core';
import {KmlFileService} from "../../service/kml-file.service";
import {KMLFile} from "./model";
import {KML} from "ol/format";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

@Component({
  selector: 'app-kml-editor',
  templateUrl: './kml-editor.component.html',
  styleUrls: ['./kml-editor.component.scss']
})
export class KmlEditorComponent {

  public readonly KML_FILES: KMLFile[] = [
    {
      name: 'Placemark',
      url: './assets/kml-files/basic/placemark.kml'
    },
    {
      name: 'Ground Overlay',
      url: './assets/kml-files/basic/ground-overlays.kml'
    },
    {
      name: 'Vienna Districts',
      url: './assets/kml-files/BEZIRKSGRENZEOGD.kml'
    }
  ];

  public readonly PARSE_SPLIT_BUTTON_ITEMS = [
    {
      label: 'Camera',
      command: () => {
        this.readCamera(this.editorContent);
      }
    },
    {
      label: 'Projection',
      command: () => {
        this.readProjection(this.editorContent);
      }
    },
    {
      label: 'Name',
      command: () => {
        this.readName(this.editorContent);
      }
    },
    {
      label: 'Network Links',
      command: () => {
        this.readNetworkLinks(this.editorContent);
      }
    },
    {
      label: 'Region',
      command: () => {
        this.readRegion(this.editorContent);
      }
    },
    {
      label: 'Geometry',
      command: () => {
        this.readGeometry(this.editorContent);
      }
    }
  ];

  @Output() addVectorLayer = new EventEmitter<VectorLayer<VectorSource>>();

  KML = new KML();

  editorContent: string;

  constructor(private kmlFileService: KmlFileService) {
  }

  onKMLFilePresetSelected(kmlFile: KMLFile) {
    if (!kmlFile) {
      return;
    }
    this.kmlFileService.getFileContentString(kmlFile.url).subscribe((fileContent: string) => {
      this.editorContent = fileContent;
    });
  }

  onEmitEditorContentAsVectorLayer() {

    const features = this.KML.readFeatures(
      this.editorContent,
      {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });

    console.log(features);

    const vectorLayer = new VectorLayer({
      opacity: 1.0,
      source: new VectorSource({
        features,
      }),
    });

    this.addVectorLayer.emit(vectorLayer);
  }

  readFeatures(s: string) {
    const features = this.KML.readFeatures(s);
    console.log('Features', features);
  }

  readCamera(s: string) {
    const camera = this.KML.readCamera(s);
    console.log('Camera', camera);
  }

  readProjection(s: string) {
    const projection = this.KML.readProjection(s);
    console.log('Projection', projection);
  }

  readName(s: string) {
    const name = this.KML.readName(s);
    console.log('Name', name);
  }

  readNetworkLinks(s: string) {
    const networkLinks = this.KML.readNetworkLinks(s);
    console.log('NetworkLinks', networkLinks);
  }

  readRegion(s: string) {
    const region = this.KML.readRegion(s);
    console.log('Region', region);
  }

  readGeometry(s: string) {
    const geometry = this.KML.readGeometry(s);
    console.log('Geometry', geometry);
  }
}

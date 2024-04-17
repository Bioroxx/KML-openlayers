import {Component, EventEmitter, Output} from '@angular/core';
import {KmlFileService} from "../../service/kml-file.service";
import {KMLFile} from "./model";

@Component({
  selector: 'app-kml-editor',
  templateUrl: './kml-editor.component.html',
  styleUrls: ['./kml-editor.component.scss']
})
export class KmlEditorComponent {

  public readonly kmlTemplateFiles: KMLFile[] = [
    {
      name: 'Stephansdom',
      url: './assets/kml/placemark.kml'
    },
    {
      name: 'Ground Overlay',
      url: './assets/kml/ground-overlays.kml'
    },
    {
      name: 'Vienna Districts',
      url: './assets/kml/BEZIRKSGRENZEOGD.kml'
    }
  ];

  public readonly importSplitButtonItems = [
    {
      label: 'Import with OpenLayers',
      command: () => {
        this.loadKmlWithOpenLayers.emit(this.editorContent);
      }
    }
  ];

  editorContent: string;

  @Output() loadKmlWithOpenLayers = new EventEmitter<string>;
  @Output() loadKmlWithPrototype = new EventEmitter<string>;

  constructor(private kmlFileService: KmlFileService) {
  }

  onLoadKmlFile(kmlFile: KMLFile) {

    if (!kmlFile) {
      this.editorContent = '';
      return;
    }

    this.kmlFileService.getFileContentString(kmlFile.url)
        .subscribe((content) => this.editorContent = content);
  }
}

import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import Map from 'ol/Map';

@Component({
  selector: 'app-open-layers-map',
  templateUrl: './open-layers-map.component.html',
  styleUrls: ['./open-layers-map.component.scss']
})
export class OpenLayersMapComponent implements AfterViewInit {

  @Input() map: Map;
  @ViewChild('openLayersMap') openLayersMap: ElementRef;

  ngAfterViewInit() {
    this.map.setTarget(this.openLayersMap.nativeElement);
  }
}

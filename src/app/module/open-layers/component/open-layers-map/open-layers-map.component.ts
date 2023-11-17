import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import Map, {MapOptions} from 'ol/Map';

@Component({
  selector: 'app-open-layers-map',
  templateUrl: './open-layers-map.component.html',
  styleUrls: ['./open-layers-map.component.scss']
})
export class OpenLayersMapComponent implements AfterViewInit {

  @Input() mapOptions: MapOptions;
  @ViewChild('openLayersMap') openLayersMap: ElementRef;

  map: Map;

  ngAfterViewInit() {
    this.map = new Map(this.mapOptions);
    this.map.setTarget(this.openLayersMap.nativeElement);
  }

  getMapInstance(): Map {
    return this.map;
  }
}

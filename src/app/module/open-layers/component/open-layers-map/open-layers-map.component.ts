import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import Map from 'ol/Map';
import {OlFeature} from '../../../../ol-kml-factory/helper/ol-types';
import {BalloonControl} from '../../../../ol-kml-factory/helper/balloon-control';

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
    this.addHighlightEventListener();
    this.addClickEventListener();
  }

  addHighlightEventListener() {
    let highlightedFeature: OlFeature | undefined;
    this.map.on('pointermove', (e) => {

      if (highlightedFeature) {
        const normalStyle = highlightedFeature.get('normalStyle');
        if (normalStyle) {
          highlightedFeature.setStyle(normalStyle);
        }
        highlightedFeature = undefined;
      }

      this.map.forEachFeatureAtPixel(e.pixel, (f) => {
        if (f instanceof OlFeature) {
          const highlightStyle = f.get('highlightStyle');
          if (highlightStyle) {
            f.setStyle(highlightStyle);
            highlightedFeature = f;
          }
        }
        return true;
      });
    });
  }

  addClickEventListener() {
    let balloonControl: BalloonControl | undefined;
    this.map.on('click', (e) => {

      if (balloonControl) {
        this.map.removeControl(balloonControl);
        balloonControl = undefined;
      }

      this.map.forEachFeatureAtPixel(e.pixel, (f) => {
        if (f instanceof OlFeature) {
          const balloonStyle = f.get('balloonStyle');
          balloonControl = new BalloonControl(balloonStyle);
          this.map.addControl(balloonControl);
        }
        return true;
      });
    });
  }
}

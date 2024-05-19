import {KmlType, NetworkLinkControl} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import BaseLayer from 'ol/layer/Base';


export class Kml implements KmlType {

  hint: string;
  networkLinkControl?: NetworkLinkControl;
  feature?: AbstractFeatureGroup;

  constructor(kml: KmlType) {
    this.hint = kml.hint;
    this.networkLinkControl = kml.networkLinkControl;
    this.feature = kml.feature;
  }

  getLayer(): BaseLayer | undefined {
    return this.feature?.olLayer;
  }
}

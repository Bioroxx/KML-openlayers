import {NetworkLinkType} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {Link} from './link';
import BaseLayer from 'ol/layer/Base';

export class NetworkLink extends AbstractFeatureGroup implements NetworkLinkType {

  refreshVisibility?: boolean;
  flyToView?: boolean;
  link?: Link;

  olLayer: BaseLayer;

  constructor(networkLinkType: NetworkLinkType) {
    super(networkLinkType);

    this.refreshVisibility = networkLinkType.refreshVisibility;
    this.flyToView = networkLinkType.flyToView;
    this.link = networkLinkType.link;
  }

  override get isVisible(): boolean {
    return this.olLayer.getVisible();
  }

  override setVisible = () => {
    this.olLayer.setVisible(true);
  }

  override setInvisible = () => {
    this.olLayer.setVisible(false);
  }
}

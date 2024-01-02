import {NetworkLinkType} from '@bioroxx/kmljs';
import {AbstractFeatureGroup} from './abstract-feature-group';
import {Link} from './link';

export class NetworkLink extends AbstractFeatureGroup implements NetworkLinkType {

  refreshVisibility?: boolean;
  flyToView?: boolean;
  link?: Link;

  constructor(networkLinkType: NetworkLinkType) {
    super(networkLinkType);

    this.refreshVisibility = networkLinkType.refreshVisibility;
    this.flyToView = networkLinkType.flyToView;
    this.link = networkLinkType.link;
  }

  override get isRendered(): boolean {
    return false;
  }

  override render = () => {

  }

  override unRender = () => {

  }

}

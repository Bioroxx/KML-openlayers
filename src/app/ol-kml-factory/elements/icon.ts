import {AbstractObjectGroup, LinkType, RefreshModeEnumType, ViewRefreshModeEnumType} from '@bioroxx/kmljs';

export class Icon extends AbstractObjectGroup implements LinkType {

  refreshMode?: RefreshModeEnumType;
  refreshInterval?: number;
  viewRefreshMode?: ViewRefreshModeEnumType;
  viewRefreshTime?: number;
  viewBoundScale?: number;
  viewFormat?: string;
  httpQuery?: string;

  constructor(linkType: LinkType) {
    super(linkType);

    this.refreshMode = linkType.refreshMode;
    this.refreshInterval = linkType.refreshInterval;
    this.viewRefreshMode = linkType.viewRefreshMode;
    this.viewRefreshTime = linkType.viewRefreshTime;
    this.viewBoundScale = linkType.viewBoundScale;
    this.viewFormat = linkType.viewFormat;
    this.httpQuery = linkType.httpQuery;
  }

}

import {DateTimeType, NetworkLinkControlType} from '@bioroxx/kmljs';
import {AbstractViewGroup} from './abstract-view-group';
import {Update} from './update';

export class NetworkLinkControl implements NetworkLinkControlType {

  minRefreshPeriod?: number;
  maxSessionLength?: number;
  cookie?: string;
  message?: string;
  linkName?: string;
  linkDescription?: string;
  linkSnippet?: string;
  expires?: DateTimeType;
  update?: Update;
  view?: AbstractViewGroup;

  constructor(networkLinkControlType: NetworkLinkControlType) {

    this.minRefreshPeriod = networkLinkControlType.minRefreshPeriod;
    this.maxSessionLength = networkLinkControlType.maxSessionLength;
    this.cookie = networkLinkControlType.cookie;
    this.message = networkLinkControlType.message;
    this.linkName = networkLinkControlType.linkName;
    this.linkDescription = networkLinkControlType.linkDescription;
    this.linkSnippet = networkLinkControlType.linkSnippet;
    this.expires = networkLinkControlType.expires;
    this.update = networkLinkControlType.update;
    this.view = networkLinkControlType.view;
  }
}

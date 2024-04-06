import {AbstractFeatureType, AbstractObjectGroup, AnyURI, AtomAuthor, AtomLink} from '@bioroxx/kmljs';
import {ExtendedData} from './extended-data';
import {Region} from './region';
import {AbstractStyleSelectorGroup} from './abstract-style-selector-group';
import {AbstractTimePrimitiveGroup} from './abstract-time-primitive-group';
import {AbstractViewGroup} from './abstract-view-group';
import {ListViewItem} from '../list-view-item';
import BaseLayer from 'ol/layer/Base';

export abstract class AbstractFeatureGroup extends AbstractObjectGroup implements AbstractFeatureType, ListViewItem {

  name?: string;
  visibility?: boolean;
  open?: boolean;
  atomAuthor?: AtomAuthor;
  atomLink?: AtomLink;
  address?: string;
  //TODO: xal:AddressDetails
  phoneNumber?: string;
  snippet?: string;
  description?: string;
  view?: AbstractViewGroup;
  timePrimitive?: AbstractTimePrimitiveGroup;
  styleUrl?: AnyURI;
  styleSelector?: AbstractStyleSelectorGroup[];
  region?: Region;
  extendedData?: ExtendedData;

  abstract olLayer?: BaseLayer;

  abstract isVisible?: boolean;
  abstract setVisible?: () => void;
  abstract setInvisible?: () => void;

  protected constructor(abstractFeatureType: AbstractFeatureType) {
    super(abstractFeatureType);

    this.name = abstractFeatureType.name;
    this.visibility = abstractFeatureType.visibility;
    this.open = abstractFeatureType.open;
    this.atomAuthor = abstractFeatureType.atomAuthor;
    this.atomLink = abstractFeatureType.atomLink;
    this.address = abstractFeatureType.address;
    this.phoneNumber = abstractFeatureType.phoneNumber;
    this.snippet = abstractFeatureType.snippet;
    this.description = abstractFeatureType.description;
    this.view = abstractFeatureType.view;
    this.timePrimitive = abstractFeatureType.timePrimitive;
    this.styleUrl = abstractFeatureType.styleUrl;
    this.styleSelector = abstractFeatureType.styleSelector;
    this.region = abstractFeatureType.region;
    this.extendedData = abstractFeatureType.extendedData;
  }
}

import {ColorType, ListItemTypeEnumType, ListStyleType} from '@bioroxx/kmljs';
import {ItemIcon} from './item-icon';
import {AbstractSubStyleGroup} from './abstract-sub-style-group';

export class ListStyle extends AbstractSubStyleGroup implements ListStyleType {

  listItemType?: ListItemTypeEnumType;
  bgColor?: ColorType;
  itemIcon?: ItemIcon[];
  maxSnippetLines?: number;

  constructor(listStyleType: ListStyleType) {
    super(listStyleType);

    this.listItemType = listStyleType.listItemType;
    this.bgColor = listStyleType.bgColor;
    this.itemIcon = listStyleType.itemIcon;
    this.maxSnippetLines = listStyleType.maxSnippetLines;
  }
}

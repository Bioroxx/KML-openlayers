import {ItemIconStateType, ItemIconType} from '@bioroxx/kmljs';
import {AbstractObjectGroup} from './abstract-object-group';

export class ItemIcon extends AbstractObjectGroup implements ItemIconType {

  state?: ItemIconStateType;
  href?: string;

  constructor(itemIconType: ItemIconType) {
    super(itemIconType);

    this.state = itemIconType.state;
    this.href = itemIconType.href;
  }
}

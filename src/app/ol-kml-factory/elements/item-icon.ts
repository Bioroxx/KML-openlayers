import {AbstractObjectGroup, ItemIconStateType, ItemIconType} from '@bioroxx/kmljs';

export class ItemIcon extends AbstractObjectGroup implements ItemIconType {

  state?: ItemIconStateType;
  href?: string;

  constructor(itemIconType: ItemIconType) {
    super(itemIconType);

    this.state = itemIconType.state;
    this.href = itemIconType.href;
  }
}

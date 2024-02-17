import {TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from './elements/abstract-feature-group';

export const LAYER_ID_KEY = 'layer-id';

export interface ListViewItem extends TreeNode<AbstractFeatureGroup> {

  isVisible?: boolean;
  setVisible?: () => void;
  setInvisible?: () => void;
}

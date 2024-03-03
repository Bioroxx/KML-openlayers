import {TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from './elements/abstract-feature-group';

export interface ListViewItem extends TreeNode<AbstractFeatureGroup> {

  isVisible?: boolean;
  setVisible?: () => void;
  setInvisible?: () => void;
}

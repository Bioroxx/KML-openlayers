import {TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from './elements/abstract-feature-group';

export interface OlRender extends TreeNode<AbstractFeatureGroup> {
  render?: () => void;
}

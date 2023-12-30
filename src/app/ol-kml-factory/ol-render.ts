import {TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from './elements/abstract-feature-group';

export const LAYER_ID_KEY = 'layer-id';

export interface OlRender extends TreeNode<AbstractFeatureGroup> {

  isRendered?: boolean;
  render?: () => void;
  unRender?: () => void;
}

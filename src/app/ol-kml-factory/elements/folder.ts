import {FolderType} from '@bioroxx/kmljs';
import {AbstractContainerGroup} from './abstract-container-group';
import {AbstractFeatureGroup} from './abstract-feature-group';
import LayerGroup from 'ol/layer/Group';

export class Folder extends AbstractContainerGroup implements FolderType {

  feature: AbstractFeatureGroup[];

  override olLayer: LayerGroup;

  constructor(folderType: FolderType) {
    super(folderType);
    this.feature = folderType.feature;
  }

  get type() {
    return 'folder';
  }

  get label() {
    return this.name;
  }

  get data() {
    return this;
  }

  get children() {
    return this.feature;
  };

  get expanded() {
    return this.open;
  }

  override get isVisible(): boolean {
    return this.feature.some(f => f.isVisible);
  }

  override setVisible = () => {
    this.feature.forEach(f => {
      if (f.setVisible) {
        f.setVisible();
      }
    });
  }

  override setInvisible = () => {
    this.feature.forEach(f => {
      if (f.setInvisible) {
        f.setInvisible();
      }
    });
  }
}

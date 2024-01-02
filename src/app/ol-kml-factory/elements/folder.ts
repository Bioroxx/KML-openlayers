import {FolderType} from '@bioroxx/kmljs';
import {AbstractContainerGroup} from './abstract-container-group';
import {AbstractFeatureGroup} from './abstract-feature-group';

export class Folder extends AbstractContainerGroup implements FolderType {

  feature: AbstractFeatureGroup[];

  constructor(folderType: FolderType) {
    super(folderType);
    this.feature = folderType.feature;
  }

  get label() {
    return this.name;
  }

  get data() {
    return this;
  }

  get type() {
    return 'folder';
  }

  get children() {
    return this.feature;
  };

  override get isRendered(): boolean {
    return this.feature.some(f => f.isRendered);
  }

  override render = () => {
    this.feature.forEach(f => {
      if (f.render) {
        f.render();
      }
    });
  }

  override unRender = () => {
    this.feature.forEach(f => {
      if (f.unRender) {
        f.unRender();
      }
    });
  }
}

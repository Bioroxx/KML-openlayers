import {FolderType} from 'kmljs';
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

  override render = () => {
    this.feature.forEach(f => {
      if (f.render) {
        f.render();
      }
    });
  }
}
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

  override addLayer = () => {
    this.feature.forEach(f => {
      if (f.addLayer) {
        f.addLayer();
      }
    });
  }

  override removeLayer = () => {
    this.feature.forEach(f => {
      if (f.removeLayer) {
        f.removeLayer();
      }
    });
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

import {AbstractFeatureGroup, FolderType} from 'kmljs';
import {AbstractContainerGroup} from './abstract-container-group';

export class Folder extends AbstractContainerGroup implements FolderType {

  feature: AbstractFeatureGroup[];

  constructor(folderType: FolderType) {
    super(folderType);
    this.feature = folderType.feature;
  }

}

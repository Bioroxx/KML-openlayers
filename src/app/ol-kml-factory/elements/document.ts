import {DocumentType, Schema} from 'kmljs';
import {AbstractContainerGroup} from './abstract-container-group';
import {AbstractFeatureGroup} from './abstract-feature-group';

export class Document extends AbstractContainerGroup implements DocumentType {

  schema: Schema[];
  feature: AbstractFeatureGroup[];

  constructor(documentType: DocumentType) {
    super(documentType);

    this.schema = documentType.schema;
    this.feature = documentType.feature;
  }

  get label() {
    return this.name;
  }

  get data() {
    return this;
  }

  get type() {
    return 'document';
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

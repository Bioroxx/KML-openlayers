import {DocumentType, Schema} from '@bioroxx/kmljs';
import {AbstractContainerGroup} from './abstract-container-group';
import {AbstractFeatureGroup} from './abstract-feature-group';
import BaseLayer from 'ol/layer/Base';

export class Document extends AbstractContainerGroup implements DocumentType {

  schema: Schema[];
  feature: AbstractFeatureGroup[];

  override olLayer: BaseLayer;

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

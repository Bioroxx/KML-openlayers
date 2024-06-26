import {DocumentType, Schema} from '@bioroxx/kmljs';
import {AbstractContainerGroup} from './abstract-container-group';
import {AbstractFeatureGroup} from './abstract-feature-group';
import LayerGroup from 'ol/layer/Group';

export class Document extends AbstractContainerGroup implements DocumentType {

  schema: Schema[];
  feature: AbstractFeatureGroup[];

  override olLayer: LayerGroup;

  constructor(documentType: DocumentType) {
    super(documentType);

    this.schema = documentType.schema;
    this.feature = documentType.feature;
  }

  get type() {
    return 'document';
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

  set expanded(value: boolean) {
    this.open = value;
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

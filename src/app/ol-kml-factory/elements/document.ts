import {AbstractFeatureGroup, DocumentType, Schema} from 'kmljs';
import {AbstractContainerGroup} from './abstract-container-group';


export class Document extends AbstractContainerGroup implements DocumentType {

  schema: Schema[];
  feature: AbstractFeatureGroup[];

  constructor(documentType: DocumentType) {
    super(documentType);

    this.schema = documentType.schema;
    this.feature = documentType.feature;
  }
}

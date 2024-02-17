import XMLFeature from 'ol/format/XMLFeature';

export class KmljsOlFormat extends XMLFeature {


  override readFeatures(source: any, options?: any): Array<any> {

    console.log('readFeatures called', source, options);


    return [];
  }
}
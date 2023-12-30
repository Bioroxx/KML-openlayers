import {
  DocumentType,
  FolderType,
  KmlFactory,
  KmlType,
  LinearRingType,
  LineStringType,
  MultiGeometryType,
  PlacemarkType,
  PointType,
  PolygonType
} from 'kmljs';
import {Kml} from './elements/kml';
import {Folder} from './elements/folder';
import {Document} from './elements/document';
import {Placemark} from './elements/placemark';
import {Point} from './elements/point';
import {transform} from 'ol/proj';
import Map from 'ol/Map'
import {Coordinate} from 'ol/coordinate';
import {LinearRing} from './elements/linear-ring';
import {Polygon} from './elements/polygon';
import {OlFeature, OlGeometryCollection, OlLinearRing, OlLineString, OlPoint, OlPolygon} from './helper/ol-types';
import {MultiGeometry} from './elements/multi-geometry';
import {LineString} from './elements/line-string';

export class OlKmlFactory extends KmlFactory {

  constructor(private map: Map) {
    super();
  }

  override createKml(obj: KmlType): KmlType {
    return new Kml(obj);
  }

  override createDocument(obj: DocumentType): DocumentType {
    return new Document(obj);
  }

  override createFolder(obj: FolderType): FolderType {
    return new Folder(obj);
  }

  override createPlacemark(obj: PlacemarkType): PlacemarkType {

    const placemark = new Placemark(obj);
    placemark.olMap = this.map;

    if (placemark.geometry && placemark.geometry instanceof Point) {
      placemark.olFeature = new OlFeature({geometry: placemark.geometry.olGeometry});
    }

    if (placemark.geometry && placemark.geometry instanceof Polygon) {
      placemark.olFeature = new OlFeature({geometry: placemark.geometry.olGeometry});
    }

    if (placemark.geometry && placemark.geometry instanceof MultiGeometry) {
      placemark.olFeature = new OlFeature({geometry: placemark.geometry.olGeometry});
    }
    
    return placemark;
  }

  override createPoint(obj: PointType): PointType {

    const point = new Point(obj);
    const coordinates = this.parseCoordinateString(point.coordinates![0])
    point.olGeometry = new OlPoint(coordinates);
    return point;
  }

  override createPolygon(obj: PolygonType): PolygonType {

    const polygon = new Polygon(obj);

    if (polygon.outerBoundaryIs?.olGeometry) {


      const innerBoundaryCoordinatesArray = (polygon.innerBoundaryIs ?? [])
        .filter(i => i !== undefined && i.olGeometry !== undefined)
        .map(i => i.olGeometry!.getCoordinates());

      const coordinates = [
        polygon.outerBoundaryIs.olGeometry.getCoordinates(),
        ...innerBoundaryCoordinatesArray
      ]

      polygon.olGeometry = new OlPolygon(coordinates);
    }

    return polygon;
  }

  override createLinearRing(obj: LinearRingType): LinearRingType {

    const linearRing = new LinearRing(obj);

    if (linearRing.coordinates) {

      const coordinatesArray = linearRing.coordinates?.map(c => this.parseCoordinateString(c));
      linearRing.olGeometry = new OlLinearRing(coordinatesArray); //ol/geom/LinearRing~LinearRing: Only used as part of polygon; cannot be rendered on its own.
    }

    return linearRing
  }

  override createLineString(obj: LineStringType): LineStringType {

    const lineString = new LineString(obj);

    if (lineString.coordinates) {

      const coordinatesArray = lineString.coordinates?.map(c => this.parseCoordinateString(c));
      lineString.olGeometry = new OlLineString(coordinatesArray);
    }

    return lineString;
  }

  override createMultiGeometry(obj: MultiGeometryType): MultiGeometryType {

    const multiGeometry = new MultiGeometry(obj);

    if (multiGeometry.geometry) {

      const olGeometriesCollection = multiGeometry.geometry
        .filter(m => m !== undefined && m.olGeometry !== undefined)
        .map(m => m.olGeometry!);

      multiGeometry.olGeometry = new OlGeometryCollection(olGeometriesCollection)
    }

    return multiGeometry;
  }

  private parseCoordinateString(coordinateString: string): Coordinate {

    const coordinateStringArray = coordinateString.split(',');

    const latitude = parseFloat(coordinateStringArray[0]);
    const longitude = parseFloat(coordinateStringArray[1]);

    return transform([latitude, longitude], 'EPSG:4326', 'EPSG:3857');
  }
}

import {
  AbstractFeatureType,
  ColorModeEnumType,
  ColorType,
  DocumentType,
  FolderType,
  IconStyleType,
  KMLFactory,
  KmlType,
  LinearRingType,
  LineStringType,
  LineStyleType,
  MultiGeometryType,
  PairType,
  PlacemarkType,
  PointType,
  PolygonType,
  PolyStyleType,
  StyleMapType,
  StyleStateEnumType,
  StyleType,
  UnitsEnumType
} from '@bioroxx/kmljs';
import {Kml} from './elements/kml';
import {Folder} from './elements/folder';
import {Document} from './elements/document';
import {Placemark} from './elements/placemark';
import {Point} from './elements/point';
import {transform} from 'ol/proj';
import {LinearRing} from './elements/linear-ring';
import {Polygon} from './elements/polygon';
import {
  OlColor,
  OlCoordinate,
  OlFeature,
  OlFill,
  OlGeometryCollection,
  OlIcon,
  OlIconAnchorUnits,
  OlIconOrigin,
  OlLinearRing,
  OlLineString,
  OlMap,
  OlPoint,
  OlPolygon,
  OlSelect,
  OlStroke,
  OlStyle,
  OlVectorLayer,
  OlVectorSource
} from './helper/ol-types';
import {MultiGeometry} from './elements/multi-geometry';
import {LineString} from './elements/line-string';
import {Style} from './elements/style';
import {LineStyle} from './elements/line-style';
import {PolyStyle} from './elements/poly-style';
import {IconStyle} from './elements/icon-style';
import {BalloonControl} from './helper/balloon-control';
import {StyleMap} from './elements/style-map';
import {click} from 'ol/events/condition';
import {Pair} from './elements/pair';

export class OlKmlFactory extends KMLFactory {

  COLOR_TRANSPARENT = [0, 0, 0, 0];
  DEFAULT_ICON_URL = './assets/images/pin_icon.png';
  DEFAULT_ICON_WIDTH = 32;
  DEFAULT_ICON_HEIGHT = 32;

  constructor(private map: OlMap) {
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

    const visible = placemark.visibility ?? true;

    placemark.olMap = this.map;
    placemark.olFeature = new OlFeature({geometry: placemark.geometry?.olGeometry});
    placemark.olVectorSource = new OlVectorSource({features: [placemark.olFeature]});
    placemark.olVectorLayer = new OlVectorLayer({source: placemark.olVectorSource, visible});

    // Styling
    let normalStyle: Style | undefined = undefined;
    let highlightStyle: Style | undefined = undefined;

    normalStyle = this.getInlineStyle(placemark) ?? this.getSharedStyleById(placemark.styleUrl);

    if (!normalStyle) {

      const styleMap = this.getInlineStyleMap(placemark) ?? this.getSharedStyleMapById(placemark.styleUrl);
      const normalPair = styleMap?.pair.find(p => p.key === StyleStateEnumType.normal);
      const highlightPair = styleMap?.pair.find(p => p.key === StyleStateEnumType.highlight);

      // A nested StyleMap is not supported
      if (normalPair && normalPair.styleSelector && normalPair.styleSelector instanceof Style) {
        normalStyle = normalPair.styleSelector;
      } else if (normalPair) {
        normalStyle = this.getSharedStyleById(normalPair.styleUrl);
      }

      // A nested StyleMap is not supported
      if (highlightPair && highlightPair.styleSelector && highlightPair.styleSelector instanceof Style) {
        highlightStyle = highlightPair.styleSelector;
      } else if (highlightPair) {
        highlightStyle = this.getSharedStyleById(highlightPair.styleUrl);
      }
    }

    placemark.olFeature.setStyle(normalStyle?.olStyle);

    // Balloon
    if (placemark.description) {
      placemark.balloonControl = new BalloonControl(this.getEntityReplacedString(placemark.description, placemark));
    } else if (normalStyle?.balloonStyle?.text) {
      placemark.balloonControl = new BalloonControl(this.getEntityReplacedString(normalStyle.balloonStyle.text, placemark));
    }

    // Click interaction
    placemark.olSelect = new OlSelect({
          condition: click,
          style: highlightStyle?.olStyle,
          layers: [placemark.olVectorLayer]
        }
    );
    placemark.olSelect.on('select', (event) => {
      if (event.selected.length) {
        placemark.onSelected();
      } else {
        placemark.onDeselected();
      }
    });

    return placemark;
  }

  override createPoint(obj: PointType): PointType {

    const point = new Point(obj);

    if (point.coordinates && point.coordinates.length > 0) {
      const coordinates = this.parseCoordinateString(point.coordinates[0])
      point.olGeometry = new OlPoint(coordinates);
    }

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
      linearRing.olGeometry = new OlLinearRing(coordinatesArray);
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

      const olGeometryCollection = multiGeometry.geometry
          .filter(m => m?.olGeometry !== undefined)
          .map(m => m.olGeometry!);

      multiGeometry.olGeometry = new OlGeometryCollection(olGeometryCollection)
    }

    return multiGeometry;
  }

  override createStyle(obj: StyleType): StyleType {
    const style = new Style(obj);
    style.olStyle = this.getOlStyleFromStyleType(style);
    return style;
  }

  override createStyleMap(obj: StyleMapType): StyleMapType {
    return new StyleMap(obj);
  }

  override createPair(obj: PairType): PairType {
    return new Pair(obj);
  }

  override createLineStyle(obj: LineStyleType): LineStyleType {
    return new LineStyle(obj);
  }

  override createPolyStyle(obj: PolyStyleType): PolyStyleType {
    return new PolyStyle(obj);
  }

  override createIconStyle(obj: IconStyleType): IconStyleType {
    return new IconStyle(obj);
  }

  private getInlineStyle(feature: AbstractFeatureType): Style | undefined {
    return feature.styleSelector?.find(abstractStyleSelectorType =>
        (abstractStyleSelectorType instanceof Style)) as Style | undefined;
  }

  private getInlineStyleMap(feature: AbstractFeatureType): StyleMap | undefined {
    return feature.styleSelector?.find(abstractStyleSelectorType =>
        (abstractStyleSelectorType instanceof StyleMap)) as StyleMap | undefined;
  }

  private getSharedStyleById(styleUrl?: string): Style | undefined {

    if (styleUrl === undefined) {
      return undefined;
    }

    return this.getSharedStyle()
        .find(s => ('#' + s.id) === styleUrl && s instanceof Style) as Style | undefined;
  }

  private getSharedStyleMapById(styleUrl?: string): StyleMap | undefined {

    if (styleUrl === undefined) {
      return undefined;
    }

    return this.getSharedStyle()
        .find(s => ('#' + s.id) === styleUrl && s instanceof StyleMap) as StyleMap | undefined;
  }

  private getOlStyleFromStyleType(styleType: StyleType) {

    const strokeWidth = styleType.lineStyle?.width ?? 1.0;
    const strokeColor = this.parseColor(styleType.lineStyle?.color, styleType.lineStyle?.colorMode);

    const fill = styleType.polyStyle?.fill ?? true;
    const fillColor = this.parseColor(styleType.polyStyle?.color, styleType.polyStyle?.colorMode);

    const iconSrc = styleType.iconStyle?.icon?.href ?? this.DEFAULT_ICON_URL;
    const iconScale = styleType.iconStyle?.scale ?? 1.0;
    const iconColor = this.parseColor(styleType.iconStyle?.color, styleType.iconStyle?.colorMode);
    const iconRotation = this.degreesToRadians(styleType.iconStyle?.heading ?? 0.0);
    const iconAnchorX = styleType.iconStyle?.hotSpot?.x ?? 1.0;
    const iconAnchorY = styleType.iconStyle?.hotSpot?.y ?? 1.0;
    const xUnits = styleType.iconStyle?.hotSpot?.xunits ?? UnitsEnumType.fraction;
    const yUnits = styleType.iconStyle?.hotSpot?.yunits ?? UnitsEnumType.fraction;
    const iconAnchorXUnits: OlIconAnchorUnits = xUnits === UnitsEnumType.fraction ? 'fraction' : 'pixels';
    const iconAnchorYUnits: OlIconAnchorUnits = yUnits === UnitsEnumType.fraction ? 'fraction' : 'pixels';

    let anchorOrigin: OlIconOrigin;

    if (xUnits === UnitsEnumType.insetPixels && yUnits === UnitsEnumType.insetPixels) {
      anchorOrigin = 'top-right';
    } else if (xUnits === UnitsEnumType.insetPixels) {
      anchorOrigin = 'bottom-right';
    } else if (yUnits === UnitsEnumType.insetPixels) {
      anchorOrigin = 'top-left';
    } else {
      anchorOrigin = 'bottom-left';
    }

    const olStroke = new OlStroke({
      width: strokeWidth,
      color: strokeColor
    });

    const olFill = new OlFill({
      color: fill ? fillColor : this.COLOR_TRANSPARENT
    })

    const olIcon = new OlIcon({
      anchorOrigin: anchorOrigin,
      anchor: [iconAnchorX, iconAnchorY],
      anchorXUnits: iconAnchorXUnits,
      anchorYUnits: iconAnchorYUnits,
      crossOrigin: 'anonymous',
      color: iconColor,
      rotation: iconRotation,
      width: this.DEFAULT_ICON_WIDTH * iconScale,
      height: this.DEFAULT_ICON_HEIGHT * iconScale,
      src: iconSrc,
    });

    return new OlStyle({
      stroke: olStroke,
      fill: olFill,
      image: styleType.iconStyle ? olIcon : undefined
    });
  }

  private parseCoordinateString(coordinateString: string): OlCoordinate {

    const coordinateStringArray = coordinateString.split(',');

    const latitude = parseFloat(coordinateStringArray[0]);
    const longitude = parseFloat(coordinateStringArray[1]);

    return transform([latitude, longitude], 'EPSG:4326', 'EPSG:3857');
  }

  private parseColor(colorType?: ColorType, colorMode?: ColorModeEnumType): OlColor | undefined {

    if (!colorType) {
      return undefined;
    }

    if (colorType.length !== 8) {
      throw new Error('Invalid ColorType length, expected length of 8: ' + colorType);
    }

    colorMode = colorMode ?? ColorModeEnumType.normal;

    // Order of expression in ColorType is "aabbggrr"
    const alpha = parseInt(colorType.substring(0, 2), 16) / 255.0;
    let blue = parseInt(colorType.substring(2, 4), 16);
    let green = parseInt(colorType.substring(4, 6), 16);
    let red = parseInt(colorType.substring(6, 8), 16);

    if (colorMode === ColorModeEnumType.normal) {
      return [red, green, blue, alpha];
    }

    if (red === 255) {
      red = Math.floor(Math.random() * 255);
    }

    if (green === 255) {
      green = Math.floor(Math.random() * 255);
    }

    if (blue === 255) {
      blue = Math.floor(Math.random() * 255);
    }

    return [red, green, blue, alpha];
  }

  private degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  private getEntityReplacedString(replacementString: string, feature: AbstractFeatureType): string {

    const regex = /\$\[[^\][]*]/g;
    const entitiesToReplace = Array.from(replacementString.matchAll(regex), m => m[0]);
    const resolvedEntityMap = new Map();

    entitiesToReplace.forEach((entity) => {
      if (resolvedEntityMap.has(entity)) {
        return;
      }
      const value = this.resolveEntityStringValue(entity.substring(2, entity.length - 1), feature);
      resolvedEntityMap.set(entity, value);
    });

    let currentEntityReplacedString = replacementString;

    entitiesToReplace.forEach((entity) => {
      currentEntityReplacedString = currentEntityReplacedString.replace(entity, resolvedEntityMap.get(entity));
    });

    return currentEntityReplacedString;
  }

  private resolveEntityStringValue(path: string, feature: AbstractFeatureType): string | undefined {

    const pathArray = path.split('/');

    if (pathArray.length > 3) {
      return undefined;
    }

    const data = feature.extendedData?.data ?? [];

    // $[element_or_attribute_name]
    // $[name_attribute_of_Data_element]
    if (pathArray.length === 1) {

      if (pathArray[0] in feature) {
        const fieldValue = feature[pathArray[0] as keyof AbstractFeatureType];
        if (typeof fieldValue === 'string') {
          return fieldValue;
        }
      }

      return data.find(d => d.name === pathArray[0])?.value;
    }

    // $[name_attribute_of_Data_element/displayName]
    if (pathArray.length === 2 && pathArray[1] === 'displayName') {
      return data.find(d => d.name === pathArray[0])?.displayName;
    }

    // TODO: $[TYPENAME/TYPEFIELD] and $[TYPENAME/TYPEFIELD/displayName]

    return undefined;
  }
}

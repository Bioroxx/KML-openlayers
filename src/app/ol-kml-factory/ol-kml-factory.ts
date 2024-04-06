import {
  AbstractFeatureType,
  BalloonStyleType,
  ColorModeEnumType,
  ColorType,
  DisplayModeEnumType,
  DocumentType,
  FolderType,
  IconStyleType,
  KMLFactory,
  KmlType,
  LinearRingType,
  LineStringType,
  LineStyle,
  LineStyleType,
  MultiGeometryType,
  Pair,
  PairType,
  PlacemarkType,
  PointType,
  PolygonType,
  PolyStyle,
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
  OlFeatureLike,
  OlFill,
  OlGeometry,
  OlGeometryCollection,
  OlIcon,
  OlIconAnchorUnits,
  OlIconOrigin,
  OlLinearRing,
  OlLineString,
  OlMap,
  OlPoint,
  OlPolygon,
  OlStroke,
  OlStyle,
  OlStyleFunction,
  OlText,
  OlVectorLayer,
  OlVectorSource
} from './helper/ol-types';
import {MultiGeometry} from './elements/multi-geometry';
import {LineString} from './elements/line-string';
import {Style} from './elements/style';
import {StyleMap} from './elements/style-map';
import RenderFeature from 'ol/render/Feature';
import {IconStyle} from './elements/icon-style';
import LayerGroup from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';

export class OlKmlFactory extends KMLFactory {

  COLOR_TRANSPARENT = [0, 0, 0, 0];
  COLOR_WHITE = [255, 255, 255, 1.0];
  COLOR_BLACK = [0, 0, 0, 1.0];
  DEFAULT_ICON_URL = './assets/images/pin_icon.png';
  DEFAULT_ICON_WIDTH = 32;
  DEFAULT_ICON_HEIGHT = 32;
  DEFAULT_LABEL_FONT = '16px Calibri,sans-serif';

  constructor(private map: OlMap) {
    super();
  }

  override createKml(obj: KmlType): Kml {
    return new Kml(obj);
  }

  override createDocument(obj: DocumentType): Document {
    const document = new Document(obj);
    const layers = document.feature
        .map(feature => feature.olLayer)
        .filter(olLayer => !!olLayer) as BaseLayer[];
    document.olLayer = new LayerGroup({layers});
    return document;
  }

  override createFolder(obj: FolderType): Folder {
    const folder = new Folder(obj);
    const layers = folder.feature
        .map(feature => feature.olLayer)
        .filter(olLayer => !!olLayer) as BaseLayer[];
    folder.olLayer = new LayerGroup({layers});
    return folder;
  }

  override createPlacemark(obj: PlacemarkType): Placemark {

    const placemark = new Placemark(obj);
    const feature = new OlFeature({geometry: placemark.geometry?.olGeometry});

    // Styling
    let normalStyle: Style | undefined = this.getInlineStyle(placemark) ?? this.getSharedStyleById(placemark.styleUrl);
    let highlightStyle: Style | undefined = undefined;

    if (!normalStyle) {

      const styleMap = this.getInlineStyleMap(placemark) ?? this.getSharedStyleMapById(placemark.styleUrl);
      const normalPair = styleMap?.pair.find(p => p.key === StyleStateEnumType.normal);
      const highlightPair = styleMap?.pair.find(p => p.key === StyleStateEnumType.highlight);

      if (normalPair && normalPair.styleSelector && normalPair.styleSelector instanceof Style) {
        normalStyle = normalPair.styleSelector;
      } else if (normalPair && normalPair.styleUrl) {
        normalStyle = this.getSharedStyleById(normalPair.styleUrl);
      }

      if (highlightPair && highlightPair.styleSelector && highlightPair.styleSelector instanceof Style) {
        highlightStyle = highlightPair.styleSelector;
      } else if (highlightPair && highlightPair.styleUrl) {
        highlightStyle = this.getSharedStyleById(highlightPair.styleUrl);
      }
    }

    const normalStyleFunction = this.getStyleFunction(placemark.name ?? '', normalStyle);
    const highlightStyleFunction = highlightStyle ? this.getStyleFunction(placemark.name ?? '', highlightStyle) : normalStyleFunction;

    feature.setStyle(normalStyleFunction);
    feature.set('normalStyle', normalStyleFunction);
    feature.set('highlightStyle', highlightStyleFunction);

    // Create enriched BalloonStyleType
    let balloonStyle: BalloonStyleType | undefined = undefined;
    if (placemark.description) {
      balloonStyle = {
        ...normalStyle?.balloonStyle,
        displayMode: normalStyle?.balloonStyle?.displayMode ?? DisplayModeEnumType.default,
        text: this.getEntityReplacedString(placemark.description, placemark),
      };
    } else if (normalStyle?.balloonStyle?.text) {
      balloonStyle = {
        ...normalStyle?.balloonStyle,
        displayMode: normalStyle?.balloonStyle?.displayMode ?? DisplayModeEnumType.default,
        text: this.getEntityReplacedString(normalStyle.balloonStyle.text, placemark)
      };
    }
    feature.set('balloonStyle', balloonStyle);

    const vectorSource = new OlVectorSource({features: [feature]});
    placemark.olLayer = new OlVectorLayer({source: vectorSource, visible: placemark.visibility ?? true});
    return placemark;
  }

  override createPoint(obj: PointType): Point {

    const point = new Point(obj);

    if (point.coordinates && point.coordinates.length > 0) {
      const coordinates = this.parseCoordinateString(point.coordinates[0])
      point.olGeometry = new OlPoint(coordinates);
    }

    return point;
  }

  override createPolygon(obj: PolygonType): Polygon {

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

  override createLinearRing(obj: LinearRingType): LinearRing {

    const linearRing = new LinearRing(obj);

    if (linearRing.coordinates) {

      const coordinatesArray = linearRing.coordinates?.map(c => this.parseCoordinateString(c));
      linearRing.olGeometry = new OlLinearRing(coordinatesArray);
    }

    return linearRing
  }

  override createLineString(obj: LineStringType): LineString {

    const lineString = new LineString(obj);

    if (lineString.coordinates) {

      const coordinatesArray = lineString.coordinates?.map(c => this.parseCoordinateString(c));
      lineString.olGeometry = new OlLineString(coordinatesArray);
    }

    return lineString;
  }

  override createMultiGeometry(obj: MultiGeometryType): MultiGeometry {

    const multiGeometry = new MultiGeometry(obj);

    if (multiGeometry.geometry) {

      const olGeometryCollection = multiGeometry.geometry
          .filter(m => m?.olGeometry !== undefined)
          .map(m => m.olGeometry!);

      multiGeometry.olGeometry = new OlGeometryCollection(olGeometryCollection)
    }

    return multiGeometry;
  }

  override createStyle(obj: StyleType): Style {
    return new Style(obj);
  }

  override createStyleMap(obj: StyleMapType): StyleMap {
    return new StyleMap(obj);
  }

  override createPair(obj: PairType): Pair {
    return new Pair(obj);
  }

  override createLineStyle(obj: LineStyleType): LineStyle {
    return new LineStyle(obj);
  }

  override createPolyStyle(obj: PolyStyleType): PolyStyle {
    return new PolyStyle(obj);
  }

  override createIconStyle(obj: IconStyleType): IconStyle {
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

  /**
   * Resolves the string value of an entity replacement path as defined in the KML reference.
   *
   * For 6.5.4 and 6.5.5, the value of a <code>SimpleData</code> element is directly resolved by its name,
   * without obtaining the value type of the <code>SimpleData</code> field, because it is resolved as a string value
   * regardless of its type. Consequently, <code>SimpleData</code> elements can be referenced, without a
   * corresponding <code>Schema</code> element.
   *
   * @param path of element, whose value shall replace the reference
   * @param feature containing the values to resolve
   * @private
   * @see 6.5 in <a href="https://portal.ogc.org/files/?artifact_id=27810">KML Reference</a>
   */
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

    // $[TYPENAME/TYPEFIELD]
    // $[TYPENAME/TYPEFIELD/displayName]
    if (!!feature.extendedData?.schemaData &&
        (pathArray.length === 2 || (pathArray.length === 3 && pathArray[2] === 'displayName'))) {

      for (const schemaData of feature.extendedData.schemaData) {

        if (!schemaData.simpleData) {
          return undefined;
        }

        for (const simpleData of schemaData.simpleData) {

          if (simpleData.name === pathArray[1]) {
            return simpleData.textContent;
          }
        }
      }
    }

    return undefined;
  }

  /**
   * Returns a style function for a feature.
   *
   * If the provided styleType or any child fields are undefined,
   * default values are applied as specified in the KML specification.
   *
   * @param labelText text of placemark label
   * @param styleType kml style to apply
   * @private
   */
  private getStyleFunction(labelText: string, styleType?: StyleType): OlStyleFunction {

    return (feature: OlFeatureLike, resolution: number): OlStyle[] => {

      const featureGeometry = feature.getGeometry();

      let geometries: OlGeometry[] = [];
      let geometryStyles: OlStyle[] = [];

      if (featureGeometry && featureGeometry instanceof OlGeometryCollection) {
        geometries = featureGeometry.getGeometriesArrayRecursive();
      } else if (featureGeometry && !(featureGeometry instanceof RenderFeature)) {
        geometries.push(featureGeometry)
      }

      geometries.forEach((geometry) => {

        if (geometry instanceof OlPoint) {
          const pointStyle = this.getOlPointStyle(labelText, styleType);
          pointStyle.setGeometry(geometry);
          geometryStyles.push(pointStyle);
        } else if (geometry instanceof OlLineString) {
          const lineStringStyle = this.getOlLineStringStyle(styleType);
          lineStringStyle.setGeometry(geometry);
          geometryStyles.push(lineStringStyle);
        } else if (geometry instanceof OlLinearRing) {
          const linearRingStyle = this.getOlLinearRingStyle(styleType);
          linearRingStyle.setGeometry(geometry);
          geometryStyles.push(linearRingStyle);
        } else if (geometry instanceof OlPolygon) {
          const polygonStyle = this.getOlPolygonStyle(styleType);
          polygonStyle.setGeometry(geometry);
          geometryStyles.push(polygonStyle);
        }
      });
      return geometryStyles;
    }
  }

  private getOlPointStyle(labelText: string, styleType?: StyleType): OlStyle {

    const iconSrc = styleType?.iconStyle?.icon?.href ?? this.DEFAULT_ICON_URL;
    const iconScale = styleType?.iconStyle?.scale ?? 1.0;
    const iconWidth = this.DEFAULT_ICON_WIDTH * iconScale;
    const iconHeight = this.DEFAULT_ICON_HEIGHT * iconScale;
    const iconColor = this.parseColor(styleType?.iconStyle?.color, styleType?.iconStyle?.colorMode) ?? this.COLOR_WHITE;
    const iconRotation = this.degreesToRadians(styleType?.iconStyle?.heading ?? 0.0);
    const iconAnchorX = styleType?.iconStyle?.hotSpot?.x ?? 1.0;
    const iconAnchorY = styleType?.iconStyle?.hotSpot?.y ?? 1.0;
    const xUnits = styleType?.iconStyle?.hotSpot?.xunits ?? UnitsEnumType.fraction;
    const yUnits = styleType?.iconStyle?.hotSpot?.yunits ?? UnitsEnumType.fraction;
    const iconAnchorXUnits: OlIconAnchorUnits = xUnits === UnitsEnumType.fraction ? 'fraction' : 'pixels';
    const iconAnchorYUnits: OlIconAnchorUnits = yUnits === UnitsEnumType.fraction ? 'fraction' : 'pixels';
    const labelColor = this.parseColor(styleType?.labelStyle?.color, styleType?.labelStyle?.colorMode) ?? this.COLOR_WHITE;
    const labelScale = styleType?.labelStyle?.scale ?? 1.0;

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

    const iconStyle = new OlIcon({
      anchorOrigin: anchorOrigin,
      anchor: [iconAnchorX, iconAnchorY],
      anchorXUnits: iconAnchorXUnits,
      anchorYUnits: iconAnchorYUnits,
      crossOrigin: 'anonymous',
      color: iconColor,
      rotation: iconRotation,
      width: iconWidth,
      height: iconHeight,
      src: iconSrc,
    });

    // base text offset calculations on icon
    const iconAnchor = iconStyle.getAnchor();
    const imageSize = iconStyle.getSize();
    const imageScale = iconStyle.getScaleArray();

    let textStyle: OlText | undefined = undefined;

    if (iconAnchor && imageSize && imageScale) {

      const labelFill = new OlFill({
        color: labelColor
      });

      const labelStroke = new OlStroke({
        width: 1,
        color: this.COLOR_BLACK
      });

      textStyle = new OlText({
        text: labelText,
        textAlign: 'left',
        font: this.DEFAULT_LABEL_FONT,
        scale: labelScale,
        fill: labelFill,
        stroke: labelStroke,
        offsetX: imageScale[0] * (imageSize[0] - iconAnchor[0]),
        offsetY: imageScale[1] * (imageSize[1] / 2 - iconAnchor[1])
      });
    }

    return new OlStyle({
      image: styleType?.iconStyle ? iconStyle : undefined,
      text: textStyle
    });
  }

  private getOlLineStringStyle(styleType?: StyleType) {

    const strokeWidth = styleType?.lineStyle?.width ?? 1.0;
    const strokeColor = this.parseColor(styleType?.lineStyle?.color, styleType?.lineStyle?.colorMode) ?? this.COLOR_WHITE;

    const olStroke = new OlStroke({
      width: strokeWidth,
      color: strokeColor
    });

    return new OlStyle({
      stroke: olStroke,
    });
  }

  private getOlLinearRingStyle(styleType?: StyleType) {

    const strokeWidth = styleType?.lineStyle?.width ?? 1.0;
    const strokeColor = this.parseColor(styleType?.lineStyle?.color, styleType?.lineStyle?.colorMode) ?? this.COLOR_WHITE;

    const olStroke = new OlStroke({
      width: strokeWidth,
      color: strokeColor
    });

    return new OlStyle({
      stroke: olStroke,
    });
  }

  private getOlPolygonStyle(styleType?: StyleType) {

    const strokeWidth = styleType?.lineStyle?.width ?? 1.0;
    const strokeColor = this.parseColor(styleType?.lineStyle?.color, styleType?.lineStyle?.colorMode) ?? this.COLOR_WHITE;

    const fill = styleType?.polyStyle?.fill ?? true;
    const outline = styleType?.polyStyle?.outline ?? true
    const fillColor = this.parseColor(styleType?.polyStyle?.color, styleType?.polyStyle?.colorMode) ?? this.COLOR_WHITE;

    const olStroke = new OlStroke({
      width: strokeWidth,
      color: outline ? strokeColor : this.COLOR_TRANSPARENT
    });

    const olFill = new OlFill({
      color: fill ? fillColor : this.COLOR_TRANSPARENT
    });

    return new OlStyle({
      stroke: olStroke,
      fill: olFill,
    });
  }
}

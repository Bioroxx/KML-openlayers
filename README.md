# KML-Openlayers

An Angular web application prototype demonstrating the capabilities of [kml.js](https://github.com/Bioroxx/kmljs) for
enhanced KML visualization with [OpenLayers](https://openlayers.org/).

## Getting Started

````shell
# Clone repository
git clone https://github.com/Bioroxx/KML-openlayers

# Install npm packages inside the project
npm install

# Serve with Angular CLI
ng serve --open
````

## Usage

When opening the application in the browser, a default dataset of vienna's districts will be loaded.
On the left you will find the list view that displays the structure of the KML document, where you can toggle
the visibility of each feature. To the right you will find the OpenLayers map that visualizes the districts.

![Application Screenshot 0](/assets/application_screenshot_0.png)

Hovering over a district displays it in its highlight style.
Clicking into a district displays its description balloon inside the map.

![Application Screenshot 1](/assets/application_screenshot_1.png)

Underneath the map you can find a simple KML editor that allows you to import your own KML document into
the application. To compare the kml.js visualization approach to OpenLayer's default KML implementation, you
can choose the respective import strategy via the split button on the bottom-right of the editor.

![Application Screenshot 2](/assets/application_screenshot_2.png)

## Approach

The application utilizes the KML parsing framework kml.js to transform a KML document into
an augmented TypeScript representation, where each supported KML feature is enriched with a layer
containing the feature. After the construction of the representation, the root layer that contains
all feature layers is added to the OpenLayers `Map` instance and the KML structure is visualized by
the application's list view.

![Visualization Approach](/assets/visualization_approach.png)

### Supported features

- `kml:Document`
- `kml:Folder`
- `kml:Placemark`

### Supported geometries

- `kml:Point`
- `kml:LineString`
- `kml:LinearRing`
- `kml:Polygon`
- `kml:MultiGeometry`

### Supported styles

- `kml:BalloonStyle`
- `kml:IconStyle`
- `kml:LabelStyle`
- `kml:LineStyle`
- `kml:PolyStyle`

## Applying this approach in your own project

If you are interested in applying this visualization approach in your own project,
the main area of interest can be found in `/src/app/ol-kml-factory/`.
This directory contains the `OlKMLFactory` class that is responsible for constructing the KML TypeScript representation
that integrates kml.js with OpenLayers.
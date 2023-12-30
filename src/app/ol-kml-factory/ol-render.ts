import Map from "ol/Map";

export interface OlRender {

  render(): void;

  olMap: Map;
}

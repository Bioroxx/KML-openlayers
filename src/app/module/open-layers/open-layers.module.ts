import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpenLayersMapComponent} from './component/open-layers-map/open-layers-map.component';
import {LayerTreeComponent} from './component/layer-tree/layer-tree.component';

@NgModule({
  declarations: [
    OpenLayersMapComponent,
    LayerTreeComponent
  ],
  exports: [
    OpenLayersMapComponent,
    LayerTreeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OpenLayersModule {
}

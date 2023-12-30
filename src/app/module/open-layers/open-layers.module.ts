import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpenLayersMapComponent} from './component/open-layers-map/open-layers-map.component';
import {LayerTreeComponent} from './component/layer-tree/layer-tree.component';
import {TreeModule} from 'primeng/tree';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';

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
    CommonModule,
    TreeModule,
    ContextMenuModule,
    ButtonModule
  ]
})
export class OpenLayersModule {
}

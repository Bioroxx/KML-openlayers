import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpenLayersMapComponent} from './component/open-layers-map/open-layers-map.component';
import {ListViewComponent} from './component/list-view/list-view.component';
import {TreeModule} from 'primeng/tree';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    OpenLayersMapComponent,
    ListViewComponent
  ],
  exports: [
    OpenLayersMapComponent,
    ListViewComponent
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

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {OpenLayersModule} from "./module/open-layers/open-layers.module";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DataViewModule} from "primeng/dataview";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OpenLayersModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    InputTextareaModule,
    FormsModule,
    InputTextModule,
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

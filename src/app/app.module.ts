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
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {DividerModule} from "primeng/divider";
import {KmlEditorComponent} from './component/kml-editor/kml-editor.component';
import {SplitButtonModule} from "primeng/splitbutton";

@NgModule({
  declarations: [
    AppComponent,
    KmlEditorComponent
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
    DataViewModule,
    DropdownModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DividerModule,
    SplitButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

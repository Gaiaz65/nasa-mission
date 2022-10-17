import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MissionImagesComponent } from './mission/mission-images/mission-images.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { MissionFormComponent } from './mission/mission-form/mission-form.component';
import { MissionComponent } from './mission/mission.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionImagesComponent,
    LoadingSpinnerComponent,
    MissionFormComponent,
    MissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

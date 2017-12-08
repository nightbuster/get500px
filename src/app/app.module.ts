import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Api500pxService } from './api500px.service';

import { HttpClientModule} from '@angular/common/http';
import { AppRouterModule } from './/app-router.module';
import { OAuthComponent } from './o-auth/o-auth.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoService } from './photo.service';
import { PhotoComponent } from './photos/photo/photo.component';


@NgModule({
  declarations: [
    AppComponent,
    OAuthComponent,
    PhotosComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
  ],
  providers: [
    Api500pxService,
    PhotoService
  ],
  entryComponents: [ PhotoComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

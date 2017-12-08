import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OAuthComponent } from './o-auth/o-auth.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [
  { path: '', component: PhotosComponent },
  { path: 'oauthcallback', component: OAuthComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouterModule {

}

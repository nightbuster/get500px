import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import {Photo} from './photo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class Api500pxService {
  private oauth_token = false;
  private loginWindow;

  public photosObservable;

  constructor(private _http: HttpClient) { }

  private refreshCallback = Function;

  setRefreshCallback(callback) {
    this.refreshCallback = callback;
  }

  runRefreshCallback() {
    this.refreshCallback();
  }

  oauthLogin () {
    this.loginWindow = window.open('https://api.500px.com/api/js-sdk/authorize?sdk_key=e459253e75fd4c7f1d6c103353b5c2ccac99f701',
      '500px_js_sdk_login',
      'width=1000,height=480,left=100,top=100,menu=no,location=yes,scrollbars=no,status=no,toolbar=no');
    window.onmessage = event => {
      if (event.data.type !== 'OAuth') { return; }
      this.loginWindow.close();
      const url = event.data.data;
      const s = url.lastIndexOf('#token:');
      const e = url.lastIndexOf(',');
      this.oauth_token = url.substring(s + 7, e);

      this.runRefreshCallback();
    };
  }

  getPhotos(page = 1) {
    if (!this.oauth_token) {
      this.oauthLogin();
      return this.photosObservable = Observable.of([]);
    }

    return this._http.get('https://api.500px.com/v1/photos?feature=popular&oauth_token=' + this.oauth_token +
      '&sdk_key=e459253e75fd4c7f1d6c103353b5c2ccac99f701&page=' + page + '&sort=created_at&image_size=3')
      .map(response => {
        return response['photos'];
      })
      .map(photos => {
        return photos.map(photo => {
          return <Photo>{
            id: photo.id,
            image_url: photo.image_url,
            like_count: 0,
            dislike_count: 0,
            review_count: 0
          };
        });
      });
  }

}

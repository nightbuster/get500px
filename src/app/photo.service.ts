import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from './photo';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PhotoService {

  photoUrl = 'http://localhost:3000/api/photos';

  constructor( private _http: HttpClient) { }

  getPhotos (): Observable<Photo[]> {
    return this._http.get<Photo[]>(this.photoUrl)
      .pipe(
      catchError(this.handleError<Photo[]>('getPhotos'))
    );
  }

  getPhotoById(photoId: number): Observable<Photo> {
    const cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: cpHeaders };
    return this._http.get<Photo>(this.photoUrl + '/' + photoId, options)
      .pipe(
        catchError(this.handleError<Photo>('getArticleById'))
      );
  }

  addPhoto (photo: Photo): Observable<Photo> {
    const cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: cpHeaders };
    return this._http.post<Photo>(this.photoUrl, photo, options);
  }

  updatePhoto(photo: Photo): Observable<number> {
    const cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: cpHeaders };
    return this._http.put<any>(this.photoUrl + '/' + photo.id, photo, options)
      .map(success => success.status)
      .pipe(
        catchError(this.handleError<Photo>('updateArticle'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(operation, error);

      return of(result as T);
    };
  }

}

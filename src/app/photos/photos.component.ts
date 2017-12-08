import {
  Component, ComponentFactoryResolver, ElementRef, OnInit, Renderer2,
  ViewChild, ViewContainerRef
} from '@angular/core';

import { Photo } from '../photo';
import { Api500pxService } from '../api500px.service';
import { PhotoService } from '../photo.service';
import {PhotoComponent} from './photo/photo.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {

  title = 'Get500px';
  page = 0;
  photos: Photo[] = [];
  private isPending = false;

  @ViewChild('root')
  private root: ElementRef;

  constructor(
    private api500pxService: Api500pxService,
    private photoService: PhotoService,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
    ) { }

  ngOnInit() {

    this.api500pxService.setRefreshCallback(() => {
      this.getPhotos();
    });
    this.getPhotos();
    this.renderer.listen('window', 'scroll', () => {
      const viewportHeight = document.documentElement.clientHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      const scrollHeight = documentHeight - viewportHeight;

      if (scrollHeight - 400 < window.pageYOffset) {
        this.getPhotos();
      }
    });
  }

  getPhotos() {
    if (this.isPending) { return; }
    this.isPending = true;
    // ToDo тут бы оптимизировать по хорошему, чтобы лишние запросы не отправлялись, но в рамках ТЗ упустим этот момент
    this.api500pxService.getPhotos(this.page++).toPromise().
    then((photos: Photo[]) => {
      this.photos.concat(photos);
      photos.forEach((photo: Photo, index) => {
        this.savePhoto(photo).then((photoSaved: Photo) => {
          photos[index] = photoSaved;
          return photoSaved;
        })
        .then((photoSaved: Photo) => {
          this.renderPhoto(photoSaved);
        })
        .catch(() => {
          this.photoService.getPhotoById(photo.id).subscribe((photoSaves: Photo) => {
            this.renderPhoto(photoSaves);
          });
        });
      });
    }).then(() => {
      this.isPending = false;
    }).catch(() => {
      this.isPending = false;
    });
  }

  savePhoto(photo: Photo) {
    return this.photoService.addPhoto(photo).toPromise();
  }

  renderPhoto(photo) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PhotoComponent);
    const photoComanent = this.viewContainerRef.createComponent(componentFactory);
    photoComanent.instance.photo = photo;
    this.renderer.appendChild(this.root.nativeElement, photoComanent.location.nativeElement);
  }

}

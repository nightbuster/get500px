import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Photo} from '../../photo';
import {PhotoService} from '../../photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  private visible = false;
  public photo: Photo;

  @ViewChild('img')
  private img: ElementRef;

  constructor(private photoService: PhotoService, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.listen('window', 'scroll', () => {
      this.calcVision();
    });
    this.calcVision();
  }

  calcVision() {
    this.img.nativeElement.position = {
      top: window.pageYOffset + this.img.nativeElement.getBoundingClientRect().top,
      left: window.pageXOffset + this.img.nativeElement.getBoundingClientRect().left,
      right: window.pageXOffset + this.img.nativeElement.getBoundingClientRect().right,
      bottom: window.pageYOffset + this.img.nativeElement.getBoundingClientRect().bottom
    };

    // Получаем позиции окна
    window['position'] = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

    if (
      // Если позиция нижней части элемента больше позиции верхней чайти окна
    this.img.nativeElement.position.bottom > window['position'].top &&
    // Если позиция верхней части элемента меньше позиции нижней чайти окна
    this.img.nativeElement.position.top < window['position'].bottom &&
    // Если позиция правой стороны элемента больше позиции левой части окна
    this.img.nativeElement.position.right > window['position'].left &&
    // Если позиция левой стороны элемента меньше позиции правой чайти окна
    this.img.nativeElement.position.left < window['position'].right) {
      this.setVision(true);
    } else {
      this.setVision(false);
    }
  }

  setVision(visible: boolean) {
    if (!this.visible && visible) {
      this.visible = visible;
      this.review();
    } else if (this.visible && !visible) {
      this.visible = visible;
    }
  }

  like() {
    this.photo.like_count++;
    this.photoService.updatePhoto(this.photo).subscribe();
  }

  dislike() {
    this.photo.dislike_count++;
    this.photoService.updatePhoto(this.photo).subscribe();
  }

  review() {
    this.photo.review_count++;
    this.photoService.updatePhoto(this.photo).subscribe();
  }

}

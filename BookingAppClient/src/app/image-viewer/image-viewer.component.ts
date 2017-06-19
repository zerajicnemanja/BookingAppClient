import { Component, OnInit, Input } from '@angular/core';
import { Image } from './image-viewer.model';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

  @Input() images: Array<Image>;
  @Input() imageWidth: number;
  @Input() imageHeight: number;

  index: number = 0;
  constructor() { }

  ngOnInit() {
  }

  next() {
    if (this.images.length - 1 == this.index) {
      this.index = 0;
    } else {
      this.index++;
    }
  }

  prev() {
    if (this.index == 0) {
      this.index = this.images.length - 1;
    } else {
      this.index--;
    }
  }

}

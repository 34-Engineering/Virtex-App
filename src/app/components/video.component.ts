import { Component, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-video',
  template: `
    <div class="reference" #reference>
      <div class="container mat-elevation-z8" #container>
        <div class="video" #video>
          <!-- <app-disconnected></app-disconnected> -->
          <canvas class="video-canvas" #videoCanvas width="640" height="480"></canvas>
        </div>
        
        <div class="bottom-bar" #bottomBar>
          
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reference {
      margin: 15px 0 0 15px;
      width: calc(100% - 30px);
      height: calc(100% - 60px);
    }

    .video {
      width: 100%;
      height: calc(100% - 64px);
    }

    .video-canvas {
      width: 100%;
      height: 100%;
    }

    .bottom-bar {
      background: #222;
      border-top: 2px solid #1e1e1e;
      height: 64px;
      width: 100%;
    }
  `]
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('reference') reference;
  @ViewChild('container') container;
  @ViewChild('videoCanvas') videoCanvas;
  @ViewChild('video') video;
  @ViewChild('bottomBar') bottomBar;
  canvasContext: any;

  ngAfterViewInit(): void {
    this.updateVideoHeight();
    this.canvasContext = this.videoCanvas.nativeElement.getContext("2d");

    setInterval(() => {
      this.updateVideo();
    }, 1000.0 / 60.0);
  }

  updateVideo(): void {
    let imageData = this.canvasContext.createImageData(640, 480);

    const size = 640 * 480 * 4;
    for (let i = 0; i < size; i += 4) {
      const rand = Math.floor(Math.random() * 70);
      imageData.data[i] = rand;
      imageData.data[i + 1] = rand;
      imageData.data[i + 2] = rand;
      imageData.data[i + 3] = 255;
    }
    
    this.canvasContext.putImageData(imageData, 0, 0);
  }

  @HostListener('window:resize')
  updateVideoHeight(): void {
    const referenceHeight = this.reference.nativeElement.offsetHeight;
    const referenceWidth = this.reference.nativeElement.offsetWidth;
    const videoHeight = referenceHeight - 64;

    if (referenceWidth * 0.5625 > videoHeight) {
      this.container.nativeElement.style = `width: ${videoHeight * (16.0 / 9.0)}px; height: 100%`;
      // this.video.nativeElement.style = `width: ${videoHeight * (16.0 / 9.0)}px; height: calc(100% - 64px)`;
      // this.bottomBar.nativeElement.style = `width: ${videoHeight * (16.0 / 9.0)}px`;
    }
    else {
      this.container.nativeElement.style = `height: ${referenceWidth * 0.5625 + 64}px; width: 100%`;
      // this.video.nativeElement.style = `height: ${containerWidth * 0.5625}px; width: 100%`;
      // this.bottomBar.nativeElement.style = `width: 100%`;
    }
  }
}
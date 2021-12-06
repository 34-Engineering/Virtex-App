import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'video-34',
  templateUrl: 'video.html',
  styleUrls: ['video.scss']
})
export class VideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  interval: NodeJS.Timeout;
  readonly frameSize = { width: 640, height: 480 };
  readonly fps = 60;

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.context = context;
    }

    this.interval = setInterval(() => {
      this.drawVideoFrame();
      this.drawTargettingData();
    }, this.fps / 1000.0);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  drawVideoFrame(): void {
    let frame = this.context.createImageData(this.frameSize.width, this.frameSize.height);
    const frameSize = this.frameSize.width * this.frameSize.height * 4;

    const offset = this.getTime();

    for (let i = 0; i < frameSize; i += 4) {
      frame.data[i + 0] = 0;
      frame.data[i + 1] = 100 * Math.abs(Math.sin(i / 100000.0 + offset)) + 155;
      frame.data[i + 2] = 0;
      frame.data[i + 3] = 255;
    }

    this.context.putImageData(frame, 0, 0);
  }

  target = { x: 200, y: 150, width: 160, height: 90 };
  drawTargettingData(): void {
    const x = this.target.x;
    const y = this.target.y;
    const width = this.target.width;
    const height = this.target.height;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.context.beginPath();

    this.drawLine(0, y, x - halfWidth, y);
    this.drawLine(this.frameSize.width, y, x + halfWidth, y);
    this.drawLine(x, 0, x, y - halfHeight);
    this.drawLine(x, this.frameSize.height, x, y + halfHeight);
    this.context.rect(x - halfWidth, y - halfHeight, width, height);

    this.context.strokeStyle = '#ffffff';
    this.context.stroke();

    const t = this.getTime() * 2;
    this.target.x = 150 * Math.cos(t) + 320;
    this.target.y = 150 * Math.sin(t) + 240;
  }

  getTime(): number {
    return ((new Date()).getTime() - 1638752059521) / 1000.0;
  }

  drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
  }
}

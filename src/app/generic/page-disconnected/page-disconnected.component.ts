import { Component } from '@angular/core';

@Component({
  selector: 'app-page-disconnected',
  template: `
    <div class="disconnected-box">
      <mat-icon>usb_off</mat-icon>
      <h1>No Camera Connection</h1>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60%;
    }

    .disconnected-box > mat-icon {
      font-size: 96px;
      width: 100%;
      text-align: center;
      color: #4c4c4c;
    }

    .disconnected-box > h1 {
      margin-top: 10px;
      font-size: 32px;
      color: #4c4c4c;
    }
  `]
})
export class PageDisconnectedComponent { }

import {Component} from '@angular/core';
import { remote, BrowserWindow } from 'electron';
import { version } from '../../../package.json';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="resize-handle top"></div>
      <div class="resize-handle left"></div>

      <object class="logo" data="./assets/icons/34E.svg" type="image/svg+xml"></object>

      <div class="title">
        Virtex App
      </div>

      <div class="window-controls">
        <button aria-label="minimize" title="Minimize" tabindex="-1" class="window-control minimize" (click)="win.minimize()">
          <svg aria-hidden="true" version="1.1" width="10" height="10">
            <path d="M 0,5 10,5 10,6 0,6 Z"></path>
          </svg>
        </button>
        <button aria-label="maximize" title="Maximize" tabindex="-1" class="window-control maximize" (click)="win.maximize()">
          <svg aria-hidden="true" version="1.1" width="10" height="10">
            <path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path>
          </svg>
        </button>
        <button aria-label="close" title="Close" tabindex="-1" class="window-control close" (click)="win.close()">
          <svg aria-hidden="true" version="1.1" width="10" height="10">
            <path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .header {
      height: 28px;
      background: #444;
      -webkit-app-region: drag;
      flex-grow: 0;
      flex-shrink: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    .logo {
      height: 20px;
      margin-top: 3px;
      width: 38px;
    }

    .title {
      color: #8c8c8c;
      font-weight: 500;
      font-size: 14px;
      margin-left: 5px;
      margin-top: 4px;
      white-space: nowrap;
    }

    .resize-handle {
      position: absolute;
      top: 0px;
      left: 0px;
      -webkit-app-region: no-drag
    }

    .resize-handle.top {
      height: 3px;
      width: 100vw;
    }

    .resize-handle.left {
      height: 28px;
      width: 3px;
    }

    .window-controls {
      flex-grow: 0;
      flex-shrink: 0;
      margin-left: auto;
    }

    .window-controls button {
      -webkit-app-region: no-drag;
      display: inline-block;
      position: relative;
      width: 45px;
      height: 100%;
      padding: 0;
      margin: 0;
      overflow: hidden;
      border: none;
      box-shadow: none;
      border-radius: 0;
      color: #cccccc;
      background-color: transparent;
      transition: background-color .25s ease;
      line-height: 10px;
    }

    .window-controls button:focus {
      outline: none
    }

    .window-controls button:hover {
      background-color: #888;
      color: #fff
    }

    .window-controls button:hover:active {
      background-color: #666;
      transition: none
    }

    .window-controls button.close:hover {
      background-color: #e81123;
      color: #fff
    }

    .window-controls button.close:hover:active {
      background-color: #bf0f1d;
      transition: none
    }

    .window-controls button svg {
      fill: currentColor
    }
  `]
})
export class HeaderComponent {
  public version: string = version;
  public win: BrowserWindow;

  constructor() {
    this.win = remote.getCurrentWindow();
  }
}
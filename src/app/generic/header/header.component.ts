import {Component} from '@angular/core';
import { remote, BrowserWindow } from 'electron';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    .header {
      height: 28px;
      background: #444444;
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
      color: #ffffff;
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

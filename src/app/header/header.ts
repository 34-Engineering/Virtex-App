import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'header-34',
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class HeaderComponent {
  minimizeWindow(): void {
    ipcRenderer.send('minimize');
  }

  maximizeWindow(): void {
    ipcRenderer.send('maximize');
  }

  closeWindow(): void {
    ipcRenderer.send('close');
  }
}

import { Component } from '@angular/core';
import {DataService} from '../../services/data-service/data.service';

@Component({
  selector: 'app-home',
  template: `
    <app-page-disconnected *ngIf="!dataService.pageData"></app-page-disconnected>
  `,
  styles: [`
    .card-wrapper {
      width: calc(100% - 40px);
      display: flex;
      flex-wrap: wrap;
      margin-top: 3px;
      padding: 20px;
    }

    .card-wrapper > app-subsystem-card {
      margin: 10px 10px 20px 10px;
      flex: 1 1 375px;
      min-width: 375px;
      max-width: 500px;
    }
  `]
})
export class HomeComponent {
  constructor(public dataService: DataService) {

  }

  getZero(): number {
    return 0;
  }
}

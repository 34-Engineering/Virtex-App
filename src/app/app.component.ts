import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    
    <div class="mid">
      <app-side-bar></app-side-bar>
      <app-video></app-video>
    </div>
  `,
  styles: [`
    .mid {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    
    app-video {
      width: calc(100% - 225px);
    }

    app-side-bar {
      width: 225px;
    }
  `]
})
export class AppComponent {
  title = 'BreakerBoard';
}

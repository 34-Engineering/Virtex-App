import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    
    <!-- <app-disconnected></app-disconnected> -->
    
    <div class="mid">
      <app-video></app-video>
      <app-parameters></app-parameters>
    </div>
    <app-bottom-bar></app-bottom-bar>
  `,
  styles: [`
    .mid {
      height: calc(100% - 56px);
      width: 100%;
    }
    
  `]
})
export class AppComponent {
  title = 'BreakerBoard';
}

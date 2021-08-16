import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  template: `
    <div class="wrapper">
      <div class="select">
        <button mat-icon-button matTooltip="Edit Parameters">
          <mat-icon>tune</mat-icon>
        </button>

        <button mat-icon-button matTooltip="Update">
          <mat-icon>upgrade</mat-icon>
        </button>
      </div>

      <div class="content">
        <mat-form-field *ngFor="let parameter of parameters | keyvalue">
          <mat-label>{{ parameter.key }}</mat-label>
          <input matInput type="number" value="0">
          <!-- <mat-select>
            <mat-option value="one">First option</mat-option>
            <mat-option value="two">Second option</mat-option>
          </mat-select> -->
        </mat-form-field>


        <button mat-raised-button>Submit</button>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
      width: 225px;
      height: 100%;
    }

    .select {
      background: #222;
      padding: 5px 5px 5px 5px;
    }

    .content {
      background: #333;
      padding: 15px;
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100% - 50px);
    }
  `]
})
export class SideBarComponent {
  parameters = {
    dualObjectMode: ['OFF', 'ON_AIN', 'ON_AOUT'],
    orientation: [0, 90, 180, 270],
    boundingWidthMin: 16,
    boundingWidthMax: 16,
    boundingHeightMin: 16,
    boundingHeightMax: 16,
    fullnessMin: 16,
    fullnessMax: 16,
    angleDiffMin: 16,
    angleDiffMax: 16,
    angleMin: 16,
    angleMax: 16,
    nearestCoordX: 16,
    nearestCoordY: 16,
    threshold: 8,
    exposure: 8
  };


}

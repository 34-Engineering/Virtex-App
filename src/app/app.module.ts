import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SafeHtmlPipe } from './components/safe-html-pipe';
import { HeaderComponent } from './components/header.component';
import { BottomBarComponent } from './components/bottom-bar.component';
import { DisconnectedComponent } from './components/disconnected.component';
import { ParametersComponent } from './components/parameters.component';
import { VideoComponent } from './components/video.component';

import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SafeHtmlPipe,
    BottomBarComponent,
    DisconnectedComponent,
    ParametersComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }

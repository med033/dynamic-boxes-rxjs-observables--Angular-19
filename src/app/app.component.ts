import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxContainerComponent } from './boxes-container/container/box-container.component';
import { OptionsComponent } from './options/options.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BoxContainerComponent,
    OptionsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Font Selector';
}
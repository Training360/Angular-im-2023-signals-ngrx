import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './common/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-im-2023-signals-ngrx';
}

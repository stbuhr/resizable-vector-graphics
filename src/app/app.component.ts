import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResizableGraphicsComponent } from './resizable-graphics/resizable-graphics.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResizableGraphicsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'resizable-vector-graphics';
}

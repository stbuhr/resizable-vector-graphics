import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-resizable-graphics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resizable-graphics.component.html',
  styleUrl: './resizable-graphics.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizableGraphicsComponent implements OnInit, OnDestroy {
  width = signal(500);
  height = signal(500);

  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((event) => {
      this.width.set(this.elementRef.nativeElement.clientWidth);
      this.height.set(this.elementRef.nativeElement.clientHeight);
    });
    this.width.set(this.elementRef.nativeElement.clientWidth);
    this.height.set(this.elementRef.nativeElement.clientHeight);
  }

  ngOnDestroy(): void {
    this.resizeSubscription$?.unsubscribe();
  }
}

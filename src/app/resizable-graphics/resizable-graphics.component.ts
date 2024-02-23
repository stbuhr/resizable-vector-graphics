import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

const viewboxWidth = 300;

@Component({
  selector: 'app-resizable-graphics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resizable-graphics.component.svg',
  styleUrl: './resizable-graphics.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizableGraphicsComponent implements OnInit, OnDestroy {
  width = signal(viewboxWidth);
  height = signal(viewboxWidth);

  fixedFontSize = computed(() => (15 * viewboxWidth) / this.width());
  responsiveFontSize = computed(() => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const minSize = (15 * viewboxWidth) / this.width();
    const maxSize = (20 * viewboxWidth) / this.width();
    const calcSize = (vw * 0.02 + 2) * (viewboxWidth / this.width());
    return Math.min(maxSize, Math.max(minSize, calcSize));
  });

  responsiveStrokeWidth = computed(() => viewboxWidth / this.width());

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

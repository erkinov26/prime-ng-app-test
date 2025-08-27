import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-throttle-time',
  imports: [ButtonDirective],
  template: ` <button #throttleBtn pButton>Click Me To Throttle</button>`,
  styleUrl: './throttle-time.css',
})
export class ThrottleTime implements AfterViewInit {
  @ViewChild('throttleBtn', { static: true }) btn!: ElementRef;

  ngAfterViewInit(): void {
    fromEvent<any>(this.btn.nativeElement, 'click') // ✅ 'button' emas 'click'
      .pipe(
        throttleTime(2000)
        // tap(() => console.log('clicked'))
      )
      .subscribe((event) => {
        console.log('Click qabul qilindi:', event);
      });
  }
}

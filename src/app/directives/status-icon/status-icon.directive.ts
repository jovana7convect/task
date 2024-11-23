import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy
} from '@angular/core';
import {Subject} from "rxjs";

@Directive({
  selector: '[status]',
  standalone: true
})
export class StatusIconDirective implements OnInit, OnDestroy {

  @Input() status!: boolean;
  private onDestroy = new Subject<void>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  public ngOnInit() {
    const icon = this.status ? 'check_circle' : 'cancel';
    const color = this.status ? 'green' : 'orange';
    this.renderer.setProperty(this.el.nativeElement, 'innerText', icon);
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }

  public ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}

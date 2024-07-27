import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[status]'
})
export class StatusIconDirective {
    @Input() status!: boolean;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    public ngOnInit() {
        const icon = this.status ? 'check_circle' : 'cancel';
        const color = this.status ? 'green' : 'orange';

        this.renderer.setProperty(this.el.nativeElement, 'innerText', icon);
        this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
}

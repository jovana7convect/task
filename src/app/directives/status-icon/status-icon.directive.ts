import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[status]'
})
export class StatusIconDirective {
    @Input() status!: boolean;

    constructor() { }

    public ngOnInit() {
    }
}

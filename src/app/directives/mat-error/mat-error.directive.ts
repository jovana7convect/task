import {ChangeDetectorRef, Directive, HostBinding, Input, OnInit, Optional, SkipSelf} from "@angular/core";
import {ControlContainer} from "@angular/forms";
import {takeUntil} from "rxjs/operators";

@Directive({
    selector: "mat-error[matErrorActive]"
})
export class MatErrorActiveDirective implements OnInit {
    // The Form Validator id (e.g. "required" or "maxlength")
    @Input() public matErrorActive: string;
    // The form control name
    @Input() public controlName: string;

    @HostBinding("class.hidden")
    public hidden = true;

    constructor(
        @Optional() @SkipSelf() private readonly parent: ControlContainer,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
        super();
    }

    public ngOnInit(): void {
        const control = this.parent?.control?.get(this.controlName);
        const hasThisError = () => !!control.errors && !!control.errors[this.matErrorActive]

        if (!!control) {
            control.statusChanges
                .pipe(takeUntil(this.onDestroy))
                .subscribe(status => {
                    this.hidden = !(status === "INVALID" && hasThisError());
                    this.changeDetectorRef.markForCheck();
                });
        }
    }

}

import {ChangeDetectorRef, Directive, HostBinding, Input, OnInit, Optional, SkipSelf} from "@angular/core";
import {ControlContainer} from "@angular/forms";
import {startWith, takeUntil} from "rxjs/operators";
import {CbBaseComponent} from "@convect/cb-commons";
import {DomSanitizer, SafeValue} from "@angular/platform-browser";

const ERROR_MAPPINGS: Record<string, (err: any) => string> = {
    // Angular Validators
    required: () => "This field is required.",
    min: ({min}) => `This field needs to be greater than ${min}.`, 
    max: ({max}) => `This field needs to be less than ${max}.`,
    email: () => "Please enter a valid email.",

    // Fallback
    default: () => "The field is not valid."
}

@Directive({
    selector: "mat-error[defaultMatErrors]"
})
export class DefaultMatErrorsDirective extends CbBaseComponent implements OnInit {

    // The form control name
    @Input() public controlName: string;

    @Input() public label?: string;

    @HostBinding("class.hidden")
    public hidden = true;

    @HostBinding("innerHtml")
    public html: SafeValue;

    constructor(
        @Optional() @SkipSelf() private readonly parent: ControlContainer,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly domSanitizer: DomSanitizer,
    ) {
        super();
    }

    public ngOnInit(): void {
        const control = this.parent?.control?.get(this.controlName);

        if (!!control) {
            control.statusChanges
                .pipe(takeUntil(this.onDestroy), startWith(control.status))
                .subscribe(status => {
                    if (status === "INVALID" && !!control.errors) {
                        // Get key and data of first error
                        const [errorKey, data]: [string, any] = Object.entries(control.errors).slice(0, 1).pop();
                        const mappingFn = this.getMappingFn(errorKey)
                        const text = this.buildErrorText(mappingFn, data)
                        this.html = this.domSanitizer.bypassSecurityTrustHtml(text)
                        this.hidden = false;
                    } else {
                        this.hidden = true;
                    }

                    this.changeDetectorRef.markForCheck();
                });
        }
    }

    // noinspection JSMethodCanBeStatic
    private getMappingFn(errorKey: string): (err: any) => string {
        return errorKey in ERROR_MAPPINGS
            ? ERROR_MAPPINGS[errorKey]
            : ERROR_MAPPINGS.default
    }

    private buildErrorText(mappingFn: (err: any) => string, data: any): string {
        return !!this.label
            ? `${this.label}: ${mappingFn(data)}`
            : mappingFn(data)
    }

}

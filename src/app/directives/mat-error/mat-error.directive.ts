import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input, OnDestroy,
  OnInit,
  Optional,
  SkipSelf
} from "@angular/core";
import {ControlContainer} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Directive({
  selector: "mat-error[matErrorActive]",
  standalone: true
})
export class MatErrorActiveDirective implements OnInit, OnDestroy {
  // The Form Validator id (e.g. "required" or "maxlength")
  @Input() public matErrorActive = "";
  // The form control name
  @Input() public controlName = "";

  @HostBinding("class.hidden")
  public hidden = true;

  private onDestroy = new Subject<void>();

  constructor(
    @Optional() @SkipSelf() private readonly parent: ControlContainer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    const control = this.parent?.control?.get(this.controlName);

    if (!!control) {
      const hasThisError = () => !!control.errors && !!control.errors[this.matErrorActive]

      control.statusChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(status => {
          this.hidden = !(status === "INVALID" && hasThisError());
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  /**
   *  Complete the Subject to finalize the unsubscription
   */
  public ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}

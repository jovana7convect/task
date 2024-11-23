import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"],
  standalone: true,
  imports: [
    MatError,
    MatDatepickerToggle,
    MatDatepickerActions,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatFormField,
    NgClass,
    NgIf,
    MatDatepicker,
    MatLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, OnChanges {

  @Input()
  public required = false;

  @Input()
  public disabled = false;

  @Input()
  public date?: number;

  @Input()
  public minDate?: Date = new Date(2000, 0, 1);

  @Input()
  public maxDate?: Date = new Date(new Date().getFullYear() + 99, 11, 31);

  @Input()
  public dateLabel = "Select date";

  @Input()
  public datePlaceholder = "dd-MM-yyyy";

  @Output()
  public startDateEventEmitter = new EventEmitter<number>();

  @Output()
  public endDateEventEmitter = new EventEmitter<number>();

  @Output()
  public dateEventEmitter = new EventEmitter<number>();

  @Output()
  public invalidDateEventEmitter = new EventEmitter<boolean>();

  public selectedDate = new FormControl<Date | null>(null);

  @ViewChild("datePicker") public datePicker!: MatDatepicker<Date>;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    if (this.date) {
      const dateObj = new Date(this.date);
      this.selectedDate.patchValue(dateObj);
    }

    if (this.required) {
      this.selectedDate?.setValidators(Validators.required);
      this.selectedDate?.updateValueAndValidity();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("date") && !changes["date"].currentValue && this.datePicker) {
      this.selectedDate.markAsUntouched();
    }

    if ((changes.hasOwnProperty("minDate") || changes.hasOwnProperty("maxDate"))) {
      this.changeDetectorRef.detectChanges()
      if (this.selectedDate.status === "INVALID" &&
        (this.selectedDate.hasError("matDatepickerMax") || this.selectedDate.hasError("matDatepickerMin"))) {
        this.selectedDate.markAsTouched();
        this.selectedDate.updateValueAndValidity();
      }
    }

    if (this.selectedDate.status === "VALID" && !this.selectedDate.errors)
      this.changeDetectorRef.detectChanges();
  }

  public onDateChange(date: Date) {
    if (date instanceof Date && !isNaN(date.getTime())) {
      this.invalidDateEventEmitter.emit(false);
      this.dateEventEmitter.next(date.getTime());
    }
  }
}

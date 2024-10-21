import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable} from "rxjs";
import {ReactiveFormsModule, FormControl, FormsModule} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {CBMaterialModule} from "@convect/cb-commons";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";

import {MatErrorActiveModule} from "@directives/mat-error-active";

export interface FilterOption {
    code: string;
    text: string;
}

@Component({
    selector: "app-autocomplete",
    templateUrl: "./autocomplete.component.html",
    styleUrls: ["./autocomplete.component.scss"],
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        CBMaterialModule,
        AsyncPipe,
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        NgIf,
        MatIconModule,
        MatErrorActiveModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DropdownSearchComponent implements OnInit {
    public searchControl = new FormControl();
    filteredOptions$: Observable<FilterOption[]> = this.searchControl.valueChanges
    .pipe(
        startWith(""),
        map(value => this._filter(value))
    );
    @Input() public options: FilterOption[] = [];
    @Output() public optionSelected = new EventEmitter<FilterOption>();
    @Input() public label: string;

    public ngOnInit() {}

    private _filter(value: string): FilterOption[] {
        const filterValue = typeof value === "string" ? value.toLowerCase() : "";
        if (!filterValue) {
            return this.options;
        }
        return this.options.filter(option =>
            option.code.toLowerCase().includes(filterValue) ||
            option.text.toLowerCase().includes(filterValue)
        );
    }

    public onSelectionChange(option: FilterOption) {
        this.searchControl.setValue(`${option.code} - ${option.text}`);
        this.optionSelected.emit(option);
    }

    public showAllOptions() {
        this.searchControl.setValue("");
        this.searchControl.updateValueAndValidity();
    }
}
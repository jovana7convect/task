import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";

import {MatErrorActiveDirective} from "./mat-error.directive";
import {DefaultMatErrorsDirective} from "./default-mat-errors.directive";


@NgModule({
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule
    ],
    declarations: [MatErrorActiveDirective, DefaultMatErrorsDirective],
    exports: [MatErrorActiveDirective, DefaultMatErrorsDirective]
})
export class MatErrorActiveModule {
}

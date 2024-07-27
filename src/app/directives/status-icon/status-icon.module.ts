import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { StatusIconDirective } from "./status-icon.directive";


@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [
        StatusIconDirective
    ],
    exports: [
        StatusIconDirective
    ]
})
export class StatusIconModule {
}

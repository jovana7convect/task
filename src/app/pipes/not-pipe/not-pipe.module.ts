import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { NotPipe } from "./not-pipe";


@NgModule({
    imports: [CommonModule],
    declarations: [NotPipe],
    exports: [NotPipe]
})
export class NotPipeModule {
}

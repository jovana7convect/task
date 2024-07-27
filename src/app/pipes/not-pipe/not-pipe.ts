import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "not"})
export class NotPipe implements PipeTransform {

    public transform(b: any): boolean {
        return !b;
    }

}

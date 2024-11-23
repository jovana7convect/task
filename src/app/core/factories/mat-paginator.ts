import {MatPaginatorIntl} from "@angular/material/paginator";

export function matPaginatorIntlNlFactory() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = "Items per page:";
    paginatorIntl.nextPageLabel = "Next page";
    paginatorIntl.previousPageLabel = "Previous page";
    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return "There are no items.";
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        // If the start index exceeds the list length, calculate end index
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} of ${length}`;
    };

    return paginatorIntl;
}

import {MatPaginatorDefaultOptions} from "@angular/material/paginator";

export function matPaginatorDefaultOptionsFactory(): MatPaginatorDefaultOptions {
    return {
        pageSize: 100,
        pageSizeOptions: [10, 100, 200],
        showFirstLastButtons: true,
    };
}

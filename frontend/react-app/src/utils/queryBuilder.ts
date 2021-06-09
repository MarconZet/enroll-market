import { BasicQueryParams } from "../api/models";

const queryBuilder = <T extends BasicQueryParams> (params: T): string => {
    let query: string = '?';

    let index = 0;
    for (let param in params) {
        if (index > 0) {
            query += '&';
        }

        query += `${param}=${params[param]}`;

        index++;
    }

    return query;
};

export default queryBuilder;

import { SortInput } from "../dto/sort.input";

export const sortBy =async (q,sort:SortInput[],columns:Record<string,string>)  => {
    for(const column of sort){
        const sortBy = columns[column.sortBy]
        if(sortBy !== undefined){
            q.addOrderBy(
                `${sortBy}`,
                column.sort.toUpperCase()
            );
        }
    }

}
import React from "react";
//<Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={changePage} length={customers.length}/>
const Pagination = ({currentPage, setCurrentPage, itemsPerPage, length}) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];
    let dots = false;
    const ends_count = 2;  //how many items at the ends (before and after [...])
    const middle_count = 2;  //how many items before and after current page

    for( let i=1; i<= pagesCount; i++) {
        pages.push(i)
    }
    const changePage = ( page ) => {
        if ( page >= 1 && page <= pagesCount ){
            setCurrentPage(page)
        }
    }

    const paginationButtons = (page) => {
        let buttons = ""
        if (page === currentPage) {
            buttons = <button
                key={page}
                className={(currentPage === page) ? "btn btn-primary" : "btn btn-secondary"}
                type="button">{page}</button>
            dots = true

            // $i <= $ends_count ||
            // ($cur_page && $i >= $cur_page - $middle_count && $i <= $cur_page + $middle_count) ||
            // $i > $number_of_pages - $ends_count
        } else if (
            page <= ends_count ||
            (currentPage && page >= currentPage - middle_count && page <= currentPage + middle_count) ||
            page > pagesCount - ends_count
        ) {
            dots = true
            buttons = <button
                key={page}
                onClick={() => changePage(page)}
                type="button"
                className={(currentPage === page) ? "btn btn-primary" : "btn btn-secondary"}>{page}</button>
        } else if( dots ) {
            buttons = <button
                key={page}
                className="btn"
                type="button">...</button>
            dots = false
        }
        return buttons
    }

    return (
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group me-2" role="group" aria-label="first group">
                <button type="button" onClick={() => changePage(1)} className="btn btn-secondary"> {"<<"} </button>
            </div>
            <div className="btn-group me-2" role="group" aria-label="Second group">
                <button type="button" onClick={() => changePage(currentPage - 1)} className="btn btn-secondary">{"<"}</button>
                {pages.map((page, index) => (
                    paginationButtons(page)
                ))}
                <button onClick={() => changePage(currentPage + 1)} type="button" className="btn btn-secondary">{">"}</button>
            </div>
            <div className="btn-group me-2" role="group" aria-label="third group">
                <button type="button" onClick={() => changePage(pagesCount)} className="btn btn-secondary"> {">>"} </button>
            </div>
        </div>
    );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage
    return items.slice(start, start+itemsPerPage);
}

export default Pagination
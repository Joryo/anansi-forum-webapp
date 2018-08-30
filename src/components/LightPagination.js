import React from 'react'
import { Pagination as ReactPagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom'

// Pagination component - Create pagination links bar
const LightPagination = ({ itemsCount, itemsCountPerPage, activePage, query, link}) => {
    activePage++
    let showPrevious = activePage > 1
    let showNext = itemsCount >= itemsCountPerPage
    let previousPage = activePage - 1
    let nextPage = activePage + 1

    // Render the pagination links
    return (
        <ReactPagination aria-label="Navigation">
            { showPrevious &&
                <PaginationItem>
                  <PaginationLink tag={Link} to={'/' + link + '/' + previousPage + query} >Précédent</PaginationLink>
                </PaginationItem>
            }
            { showNext &&
                <PaginationItem>
                  <PaginationLink tag={Link} to={'/'+link+'/' + nextPage + query}>Suivant</PaginationLink>
                </PaginationItem>
            }
        </ReactPagination>
    )
}

export default LightPagination

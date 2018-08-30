import React from 'react'
import { Pagination as ReactPagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom'

const MAX_PAGINATION_LINK = 10

// Pagination component - Create pagination links bar
const Pagination = ({ itemsCountPerPage, totalItemsCount, activePage, link}) => {
    itemsCountPerPage = parseInt(itemsCountPerPage, 10)
    // Don't show pagination if not enough items
    if (totalItemsCount <= itemsCountPerPage) {
        return null
    }

    // Calculate up and down limit
    let totalPage = Math.floor(totalItemsCount / itemsCountPerPage) + 1
    let nextPage = Math.floor(activePage/MAX_PAGINATION_LINK) * MAX_PAGINATION_LINK + MAX_PAGINATION_LINK + 1
    let previousPage = nextPage - MAX_PAGINATION_LINK - 1

    // Create page link between limit
    let createPageLinks = () => {
        let links = []
        for (let i = previousPage + 1; i < nextPage && i < totalPage + 1; i++) {
            let active = i === activePage + 1 ? true : false
            links.push(
                <PaginationItem key={i} active={active}>
                    <PaginationLink tag={Link} to={'/'+link+'/'+i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return links
    }

    // Render the pagination links
    return (
        <ReactPagination aria-label="Navigation">
            { previousPage !== 0 &&
                <PaginationItem>
                  <PaginationLink tag={Link} to={'/' + link + '/' + previousPage} previous/>
                </PaginationItem>
            }
            {createPageLinks()}
            { nextPage < totalPage &&
                <PaginationItem>
                  <PaginationLink tag={Link} to={'/'+link+'/' + nextPage} next/>
                </PaginationItem>
            }
        </ReactPagination>
    )
}

export default Pagination

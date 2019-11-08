import React, {Component} from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

interface IProps {
  onChangePage: any
  initialPage?: number
  lastPage: number
  total: any
}
export interface IState {
  pager: any
}
export const initialState: IState = {
  pager: {}
}
class Paginate extends Component<IProps, IState> {
  state = {
    ...initialState,
  }
  static defaultProps = {
    initialPage: 1,
  }
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps:Readonly<IProps>) {
    if (this.props.total !== prevProps.total) {
      this.setPager(this.props.initialPage)
    }
  }

  setPager(page) {
    if (page < 1 || page > this.props.lastPage) {
      return
    }
    // get new pager object
    const pager = this.getPager(this.props.total, page)
    // update state
    this.setState({ pager: pager })
  }
  pageClick(page){
    this.setPager(page)
    // call change page function in parent component
    this.props.onChangePage(page)
  }
  getPager(totalItems, currentPage) {
    let startPage, endPage
    if (this.props.lastPage <= 10) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = this.props.lastPage
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= this.props.lastPage) {
        startPage = this.props.lastPage - 9
        endPage = this.props.lastPage
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i)
    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      pages: pages
    }
  }

  render() {
    const pager = this.state.pager
    if (!pager.pages || this.props.lastPage <= 1) {
      // don't display pager if there is only 1 page
      return null
    }

    return (
        <Pagination className={'justify-content-end d-flex'}>
          <PaginationItem className={pager.currentPage === 1 ? 'disabled' : ''}>
            <PaginationLink onClick={() => this.pageClick(1)}><i className="fa fa-angle-double-left"></i></PaginationLink>
          </PaginationItem>
          <PaginationItem className={pager.currentPage === 1 ? 'disabled' : ''}>
            <PaginationLink onClick={() => this.pageClick(pager.currentPage - 1)}><i className="fa fa-angle-left"></i></PaginationLink>
          </PaginationItem>
          {pager.pages.map((page, index) =>
              <PaginationItem key={index} className={pager.currentPage === page ? 'active' : ''}>
                <PaginationLink onClick={() => this.pageClick(page)}>{page}</PaginationLink>
              </PaginationItem>
          )}
          <PaginationItem className={pager.currentPage === this.props.lastPage ? 'disabled' : ''}>
            <PaginationLink onClick={() => this.pageClick(pager.currentPage + 1)}><i className="fa fa-angle-right"></i></PaginationLink>
          </PaginationItem>
          <PaginationItem className={pager.currentPage === this.props.lastPage ? 'disabled' : ''}>
            <PaginationLink onClick={() => this.pageClick(this.props.lastPage)}><i className="fa fa-angle-double-right"></i></PaginationLink>
          </PaginationItem>
        </Pagination>
    )
  }
}

export default Paginate
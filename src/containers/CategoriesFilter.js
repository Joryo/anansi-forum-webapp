import { connect } from 'react-redux'
import CategoriesFilter from '../components/CategoriesFilter.js'
import Api from '../Api.js';
import { query } from 'redux-bees'
import { compose } from 'redux'
import { updateFilter } from '../actions/filters.js'

const mapStateToProps = (state, props) => ({
    isOpen: state.filters.isOpen,
    tags: props.tags,
    filters : state.filters.length > 0 ?
        state.filters
        :
        props.tags ?
            props.tags.map((tag) => {return tag.id})
            :
            []
})

const mapDispatchToProps = (dispatch, props) => ({
    handleChange: (tagId) => {
        dispatch(updateFilter(tagId))
    }
})

const enhance = compose(
    query('tags', Api.getTags),
    connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(CategoriesFilter)

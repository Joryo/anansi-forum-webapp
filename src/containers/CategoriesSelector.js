import { connect } from 'react-redux'
import { query } from 'redux-bees'
import { compose } from 'redux'
import CategoriesSelector from '../components/CategoriesSelector.js'
import Api from '../Api.js';

const mapStateToProps = (state, props) => {
    var tags = []
    var defaultValues = false

    // Wait full loading of tags
    if (props.tags && props.defaultValues) {
        defaultValues = []
        for (var index = 0; index < props.tags.length ; index++) {
            let tagValue = {
                value: props.tags[index].id,
                label: props.tags[index].attributes.text,
                color: props.tags[index].attributes.color,
            }
            tags.push(tagValue)
            if (props.defaultValues.map((e) => {return e.value}).indexOf(props.tags[index].id) !== -1) {
                defaultValues.push(tagValue)
            }
        }
    }

    return ({
        tags : tags,
        onChange: props.setFieldValue,
        onBlur: props.setFieldTouched,
        defaultValues : defaultValues,
    })
}

const mapDispatchToProps = (dispatch, props) => ({
    handleChange: (value) => {
        props.onChange('tags', value);
    }
})

const enhance = compose(
    query('tags', Api.getTags),
    connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(CategoriesSelector)

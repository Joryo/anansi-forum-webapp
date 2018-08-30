import React from 'react'
import Select from "react-select"
import categoriesStyle from '../styles/categories.js'

// Categories selector component - Display a list of tags that can be selected on a form
const CategoriesSelector = ({ tags, defaultValues, selectedOptions, handleChange }) => (
    <div>
        { defaultValues &&
            <Select
                id="tags"
                defaultValue={defaultValues}
                onChange={handleChange}
                isMulti
                options={tags}
                styles={categoriesStyle}
            />
        }
    </div>
)

export default CategoriesSelector

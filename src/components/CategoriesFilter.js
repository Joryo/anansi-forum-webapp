import React from 'react'
import { TagMenu } from './Tag.js'
import CategoriesFilterStyle from '../styles/categoriesFilter.js'

// Categories selector component - Display a list of tags that can be clicked
const CategoriesFilter = ({ tags, filters, handleChange }) => (
    <div>
        { tags &&
            <div style= {CategoriesFilterStyle.content}>
                <h3>
                    {tags.map(tag =>
                        <TagMenu
                            key={tag.id}
                            tag={tag}
                            handleClick={handleChange}
                            disable={filters.indexOf(tag.id) === -1}
                        />
                    )}
                </h3>
            </div>
        }
    </div>
)

export default CategoriesFilter

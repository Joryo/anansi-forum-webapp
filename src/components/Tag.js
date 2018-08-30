import React from 'react'
import { TagStyle, TagMenuStyle } from '../styles/tag.js'
import { Badge } from 'reactstrap';

// Tag component - Display a tag with his color
export const Tag = ({
    tag
}) => (
    <Badge
        pill
        style={TagStyle.label(tag.attributes.color)}>
        {tag.attributes.text}
    </Badge>
)

// TagMenu component - Display a tag for menu selection with his color
export const TagMenu = ({
    tag,
    handleClick,
    disable = false,
}) => (
    <Badge
        style={TagMenuStyle.label(tag.attributes.color, handleClick, disable)}
        onClick={() => handleClick(tag.id)}>
        {tag.attributes.text}
    </Badge>
)

import chroma from 'chroma-js'

export const TagStyle = {
    label : (color) => {
        const chromaColor = chroma(color);
        return {
            backgroundColor : chromaColor.alpha(0.1).css(),
            color : chromaColor.alpha(0.9).css(),
            marginLeft: '3px',
        }
    }
}

export const TagMenuStyle = {
    label : (color, handleClick, disable) => {
        color = disable ? 'grey' : color
        const chromaColor = chroma(color);
        return {
            backgroundColor : chromaColor.alpha(0.1).css(),
            color : chromaColor.alpha(0.9).css(),
            marginLeft: '3px',
            cursor: 'pointer',
            textDecoration: disable ? 'line-through' : '',
        }
    }
}



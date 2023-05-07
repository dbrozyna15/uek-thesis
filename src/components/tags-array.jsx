const TagsArray = ({tags}) => {
    let result = '';
    for (let tag of tags) {
        result += getTag(tag);
    }
    result = result.slice(0, -2);
    return (
        <span>{result}</span>
    )
}

const getTag = (tag) => {
    return (
        tag + ', '
    )
}

export default TagsArray;
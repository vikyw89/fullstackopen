const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    if (array.length === 0) {
        return 0
    }
    return array.reduce(reducer, 0) / array.length
}

module.exports = {
    reverse,
    average,
}
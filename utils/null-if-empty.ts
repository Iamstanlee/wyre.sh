const nullIfEmpty = (prop: string | undefined) => {
    if (prop !== undefined && prop.trim() === '') {
        return undefined
    }
    return prop
}

export default nullIfEmpty
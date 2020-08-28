export const loadState = () => {
    try {
        let serializedState = localStorage.getItem('state')

        if (serializedState === null) {
            return undefined
        }
        let storageState = JSON.parse(serializedState)

        return storageState
    } catch (err) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        // saves state to localStorage
        localStorage.setItem('state', serializedState)
    } catch (err) {
        console.log('error and unable to save state', err)
    }
}
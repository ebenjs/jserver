export const statusFormatter = (status: number): string => {
    if (status < 300) {
        return `<span style="color: #61b539">${status}</span>`
    }
    return `<span style="color: #c90b44">${status}</span>`
}
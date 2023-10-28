import { getState, setState } from './state.js'

interface FindOneType {
  type: string
  id: string
}

export const crudAdd = (newData: object): void => {
  getState().data.push(newData)
}

export const crudPut = (id: string, newData: object): boolean => {
  const retrievedItem: { type: string, id: string } | false = crudFindOneId(id)
  if (retrievedItem === false) {
    return false
  }

  if (retrievedItem.type === 'client-sent') {
    const filteredData = getState().data.filter((item: any) => {
      if (item.id !== undefined && item.id !== null) {
        return item.id.toString() !== id
      }
      return true
    })

    filteredData.splice(Number(id), 0, newData)
    filteredData.push(newData)
    setState(filteredData)
    return true
  }

  if (retrievedItem.type === 'auto') {
    const filteredData = [...getState().data]
    filteredData[parseInt(retrievedItem.id)] = newData
    setState(filteredData)
    return true
  }

  return false
}

export const crudDelete = (id: string): boolean => {
  const filteredData = getState().data.filter((item: any) => {
    if (item.id !== undefined && item.id !== null) {
      return item.id.toString() !== id
    }
    return true
  })

  if (JSON.stringify(filteredData) === JSON.stringify(getState().data)) {
    return checkForAutoIncrementAndDeleteIfPossible(id)
  }
  setState(filteredData)
  return true
}

export const crudFindOne = (id: string): object | false => {
  const item: object | false = getState().data.find((item: any) => {
    if (item.id !== undefined && item.id !== null) {
      return item.id.toString() === id
    }
    return false
  }) ?? false

  if (item === false) {
    return checkForAutoIncrementAndReturnIfPossible(id)
  }
  return item
}

const checkForAutoIncrementAndDeleteIfPossible = (id: string): boolean => {
  for (let index = 0; index < getState().data.length; index++) {
    if (index.toString() === id) {
      const filteredData = [...getState().data]
      filteredData.splice(index, 1)
      setState(filteredData)
      return true
    }
  }
  return false
}

const checkForAutoIncrementAndReturnIfPossible = (id: string): object | false => {
  for (let index = 0; index < getState().data.length; index++) {
    if (index.toString() === id) {
      return getState().data[index]
    }
  }
  return false
}

const crudFindOneId = (id: string): FindOneType | false => {
  const item: object | false = getState().data.find((item: any) => {
    if (item.id !== undefined && item.id !== null) {
      return item.id.toString() === id
    }
    return false
  }) ?? false
  if (item === false) {
    for (let index = 0; index < getState().data.length; index++) {
      if (index.toString() === id) {
        return { type: 'auto', id }
      }
    }
    return false
  }
  return { type: 'client-sent', id }
}

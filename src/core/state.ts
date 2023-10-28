interface StateType {
  data: object[]
}

const globalDataState: StateType = { data: [{}] }

export const getState = (): StateType => {
  return globalDataState
}

export const setState = (newDataState: object[]): void => {
  globalDataState.data = newDataState
}

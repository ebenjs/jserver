import { exposeJsonData } from './jserver.js'
import { type Express } from 'express'
import { getState, setState } from './state.js'
import { crudAdd, crudDelete, crudFindOne, crudPut } from './crud.js'

export const bindSingleFileRoutes = (fullPath: string, app: Express, baseFileName: string = ''): void => {
  const data: object[] = exposeJsonData(fullPath)
  setState(data)

  app.get('/metadata', (req, res) => {
    res.statusCode = 200
    res.json({
      name: baseFileName,
      schema: data[0],
      url: `${process.env.DEFAULT_SERVER_URL}:${process.env.DEFAULT_SERVER_PORT}`
    })
  })

  app.get(`/${baseFileName}`, (req, res) => {
    res.statusCode = 200
    res.json(getState())
  })

  app.get(`/${baseFileName}/:id`, (req, res) => {
    const id: string = req.params.id
    const item: object | false = crudFindOne(id)
    if (item === false) {
      res.statusCode = 404
      res.send('Resource not found')
      return
    }
    res.statusCode = 200
    res.json(item)
  })

  app.post(`/${baseFileName}`, (req, res): void => {
    const postData = req.body
    crudAdd(postData)
    res.statusCode = 201
    res.json(postData)
  })

  app.put(`/${baseFileName}/:id`, (req, res): void => {
    const id: string = req.params.id
    const postData = req.body
    const putResult = crudPut(id, postData)
    if (!putResult) {
      res.statusCode = 404
      res.send('Resource not found')
      return
    }
    res.statusCode = 200
    res.json(postData)
  })

  app.delete(`/${baseFileName}/:id`, (req, res): void => {
    const id: string = req.params.id
    const deletionResult: boolean = crudDelete(id)
    if (!deletionResult) {
      res.statusCode = 404
      res.send('Resource not found')
      return
    }
    res.statusCode = 204
    res.send('Resource deleted successfully')
  })
}

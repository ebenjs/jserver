import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.printf(({ message }) => {
      return `${message}`
    })
  ),
  defaultMeta: { service: 'gserver' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({

  }))
}

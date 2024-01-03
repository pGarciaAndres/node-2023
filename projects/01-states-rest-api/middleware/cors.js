import cors from 'cors'

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://states.com'
]

export const corsMiddleware = ({ allowedOrigins = ALLOWED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})

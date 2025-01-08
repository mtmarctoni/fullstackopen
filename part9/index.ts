import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

const PORT = 3002

const validateBmiArgs = (req: Request, _res: Response, next: NextFunction) => {
    const { weight, height } = req.query

    if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
        return next(new Error('malformatted parameters'))
    }
    next()
}

const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'malformatted parameters') {
        res.status(400).json({ error: 'malformatted parameters' })
    }
    next(err)
}

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', validateBmiArgs, (req, res) => {
    const { weight, height } = req.query
    
    res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(Number(height), Number(weight))
    })
})

app.post('/exercises', (req, res) => {
    const { dailyExercises, target } = req.body
    
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, type ExercisesResult } from './exerciseCalculator';

const app = express();

const PORT = 3002;

const validateBmiArgs = (req: Request, _res: Response, next: NextFunction) => {
    const { weight, height } = req.query;

    if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
        return next(new Error('malformatted parameters'));
    }
    next();
};

const validateExArgs = (req: Request, _res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return next(new Error('parameters missing'));
    }
        
    if (
        !Array.isArray(daily_exercises) || isNaN(Number(target))
        || daily_exercises.some((ex) => isNaN(Number(ex)))
    ) {
        return next(new Error('malformatted parameters'));
    }
    
    next();
    
};

const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'malformatted parameters') {
        res.status(400).json({ error: 'malformatted parameters' });
    } else if (err.message === 'parameters missing') {
        res.status(400).json({ error: 'parameters missing' });
    } else {
        res.status(500).json({ error: 'something went wrong' });
        next(err);
    }
};


app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', validateBmiArgs, (req, res) => {
    const { weight, height } = req.query;
    
    res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

app.post('/exercises', validateExArgs, (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parseExercises: Array<number> = daily_exercises
        .map((ex: string) => Number(ex));

    const result: ExercisesResult = calculateExercises(parseExercises, Number(target));

    res.json(result);
    
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
interface ExercisesResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments = (Args: Array<string>):
    {
        exercisesList: Array<number>,
        target: number
    } => {
    
    if (Args.length < 3) throw new Error('Not enough arguments');
    
    const prevExercisesList: Array<string> = Args.slice(3)
    const target: number = Number(Args[2])

    const exercisesList: Array<number> = prevExercisesList.map((day: string) => {
        if (!isNaN(Number(day))) {
            return Number(day)
        } else {
            throw new Error('There is some value that is not a number')
        }
    })

    console.log(exercisesList)
    

    return {
        exercisesList,
        target
    }
}

const calculateExercises = (hours: Array<number>, target: number): ExercisesResult => {


    const periodLength: number = hours.length
    const trainingDays: number = hours.filter((day: number) => day > 0).length
    const average: number = hours.reduce((acc, day) => acc + day, 0) / periodLength
    const success: boolean = average >= target
    let rating:number
    let ratingDescription: string

    if (average >= target) {
        rating = 3
        ratingDescription = "¡Excelente! Has alcanzado o superado tu objetivo."
    } else if (average >= target * 0.9) {
        rating = 2
        ratingDescription = "No está mal, pero podrías mejorar. Estás cerca de tu objetivo."
    } else {
        rating = 1
        ratingDescription = "Necesitas esforzarte más para alcanzar tu objetivo."
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const {exercisesList, target } = parseArguments(process.argv)
    console.log(calculateExercises(exercisesList, target))
} catch (err: unknown) {
    let errMsg = 'Something went wrong'
    if (err instanceof Error) errMsg += '\nError: ' + err.message
    console.log(errMsg)
}


//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

const parseArgs = (args: Array<string>):
    {
        height: number,
        weight: number
    } => {
    
    if (args.length < 4) throw new Error('Not enough arguments')

    if (args.length > 4) throw new Error('Too many arguments')
        
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}



const calculateBmi = (height: number, weight: number): string => {
    let bmi: number
    
    bmi = weight / (height / 100) ** 2
    
    if (bmi >= 30) return 'Overweight'
    if (bmi < 18.5) return 'Underweight'
    
    return 'Normal weight (healthy)'
}

try {
    const { height, weight } = parseArgs(process.argv)
    console.log(calculateBmi(height, weight))
} catch (err: unknown) {
    let errMsg = 'Something went wrong'
    if (err instanceof Error) errMsg += '\nError: ' + err.message
    console.log(errMsg)
}
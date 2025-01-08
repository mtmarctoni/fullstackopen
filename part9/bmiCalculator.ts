
// const parseArguments = (args: Array<String>) => {
//     if (args.length < 4) throw new Error('Not enough arguments')
//     if (args.length > 4) throw new Error('Too many arguments')
    
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             value1: Number(args[2]),
//             value2: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }


const calculateBmi = (height: number, weight: number): string => {
    let bmi: number
    let result: string
    
    bmi = weight / (height / 100) ** 2
    
    if (bmi >= 30) return 'Overweight'
    if (bmi < 18.5) return 'Underweight'
    
    return 'Normal weight (healthy)'
}

console.log(calculateBmi(180, 74))
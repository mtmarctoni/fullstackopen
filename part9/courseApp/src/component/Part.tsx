import { type CoursePart } from "../types";

const assertNever = (val: never): never => {
    throw Error(
        `Unhandled discriminated union member: ${JSON.stringify(val)}`
    )
}

const Part = ({ course }: { course: CoursePart }) => {

    switch (course.kind) {
        case 'basic':
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>Description {course.description}</p>
                </div>
            )
        case 'group':
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>Project exercises: {course.groupProjectCount}</p>
                </div>
            )

        case 'background':
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>{course.description}</p>
                    <p>{course.backgroundMaterial}</p>
                </div>
            )
        case 'special':
            return (
                <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>{course.description}</p>
                    <p>Required skills: {course.requirements.join(', ')}</p>
                </div>
            )

        default:
            assertNever(course)
            return <></>
    }
}

export default Part;
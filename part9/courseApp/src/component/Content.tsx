import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {

    return (
        <section>
            <ul>
                {courseParts.map(course => 
                    <li key={course.name}>
                        <Part course={course} />
                    </li>
            )}
            </ul>
        </section>
    )
}

export default Content;
import Content from './Content'

import Header from './Header'

const Course = ({ course }) => {
    return (
        <>
            {course.map((singleCourse) => (
                <div key={singleCourse.id}>
                    <Header title={singleCourse.name} />
                    <Content parts={singleCourse.parts} />
                </div>
            ))}
        </>
    )
}


export default Course
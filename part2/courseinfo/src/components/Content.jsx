import Part from './Part';

const Content = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <>
            <ul>
                {parts.map(part => (
                    <Part key={part.id} title={part.name} exercises={part.exercises} />
                ))}
            </ul>
            <p><strong>Total of {totalExercises} exercises</strong></p>
        </>
    )
}

export default Content
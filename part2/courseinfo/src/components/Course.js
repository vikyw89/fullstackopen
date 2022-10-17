import React from 'react'

const Course = ({course}) => {
    console.log('Course', course)
    return (
        <div>
            <Header header={course.name}/>
            <Content content={course.parts}/>
            <Total total={course.parts}/>
        </div>
    )
}

const Header = ({header}) => {
    console.log('Header', header)
    return (
        <>
            <h1>
                {header}
            </h1>
        </>
    )
}

const Content = ({content}) => {
    console.log('Content', content)
    return (
        <>
            {content.map(part =>
                <Part key={part.id} part={part}/>
            )}
        </>
    )
}

const Part = ({part}) => {
    console.log('Part', part)
    return (
        <>
            <p>
                {part.name} {part.exercises}
            </p>
        </>
    )
}

const Total = ({total}) => {
    console.log('Total', total)
    const totalExercises = total.reduce((s, p) => p.exercises + s, 0)
    return (
        <>
        <p>
            <b>total of {totalExercises} exercises</b>
        </p>
        </>
    )
}


export default Course
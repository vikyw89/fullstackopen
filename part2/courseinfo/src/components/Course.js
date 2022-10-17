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
    let totalCourse = 0
    for (let element of total) {
        totalCourse += element.exercises
    }
    return (
        <>
        <p>
            <b>total of {totalCourse} exercises</b>
        </p>
        </>
    )
}


export default Course
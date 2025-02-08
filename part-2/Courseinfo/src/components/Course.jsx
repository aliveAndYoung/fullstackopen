import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => (
    <div>
        {parts.map((currPart) => (
            <Part key={currPart.id} part={currPart} />
        ))}
    </div>
);

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
);

const Total = ({ total }) => {
    let totalExercises = total.reduce((cumm, curr) => cumm + curr.exercises, 0);
    return <b>Total of {totalExercises} exercises </b>;
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts} />
        </div>
    );
};

export default Course;

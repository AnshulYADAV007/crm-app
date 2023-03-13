import React from "react";
import C3Chart from "react-c3js";
import "c3/c3.css";

const data = {
  columns: [["data1", 685, 697, 720, 730, 720, 725], ["data2", 700, 700, 700, 700, 700, 700]],
  type: "spline",
  names: {
    data1: "Your score over the last 6 months",
    data2: "National Average"
  }
};

const axis = {
  y: {
    padding: {
      bottom: 0
    },
    show: true,
    tick: {
      outer: false
    },
    min: 690
  },
  x: {
    padding: {
      left: 0.1,
      right: 0.1
    },
    show: true,
    type: "category",
    categories: ["Nov", "Dec", "Jan", "Feb", "Mar", "April"]
  }
};

const point = {
  show: true
};

const size = {
  height: 256
};

const padding = {
  bottom: 0,
  left: -1,
  right: -1
};

const legend = {
  show: false,
  position: "inset",
  padding: 0,
  inset: {
    anchor: "top-left",
    x: 20,
    y: 8,
    step: 10
  }
};

const ScoreGraph = props => {
  return <C3Chart data={data} axis={axis} point={point} size={size} padding={padding} legend={legend} />;
};

export default ScoreGraph;

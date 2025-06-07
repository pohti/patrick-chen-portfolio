'use client'

import React from 'react'
import GridLayout from "react-grid-layout";
import "./styles.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"


const Trading = () => {
      const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ];
  return (
    <GridLayout
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      <div key="a">a</div>
      <div key="b">b</div>
      <div key="c">c</div>
      {/* <div className="top-section">
        <div className="chart-container">
          chart
        </div>
        <div className="news-container">
          news
        </div>
      </div>
      <div className="bottom-section">
        <div className="watch-list-container">
          watch list
        </div>
        <div className="trade-tool-container">
          trade tool
        </div>
      </div> */}
    </GridLayout>
  )
}

export default Trading
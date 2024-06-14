import React, { useEffect, useRef, useState } from 'react';

interface DataPoint {
  x: number;
  y: number;
}

const data = [
  {
    label: 'Dataset 1',
    points: [
      { x: 1, y: 10 },
      { x: 2, y: 15 },
      { x: 3, y: 8 },
      { x: 4, y: 12 },
      { x: 5, y: 20 },
      { x: 6, y: 25 },
      { x: 7, y: 18 },
    ],
    color: 'red',
  },
  {
    label: 'Dataset 2',
    points: [
      { x: 1, y: 5 },
      { x: 2, y: 10 },
      { x: 3, y: 6 },
      { x: 4, y: 14 },
      { x: 5, y: 18 },
      { x: 6, y: 22 },
      { x: 7, y: 15 },
    ],
    color: 'blue',
  },
];

const xInterval = 50;
const yInterval = 20;

export const AppChart = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div style={{ position: 'relative', overflowX: 'auto', width: '100%' }}>
      <canvas
        ref={canvasRef}
        width={data[0].points.length * xInterval + 100} // ширина canvas с учетом количества точек
        height={600}
        style={{ border: '1px solid black' }}
        // onMouseMove={handleMouseMove}
      />
    </div>
  );
};

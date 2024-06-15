import React, { useEffect, useRef, useState } from 'react';
import cls from './AppChart.module.scss';

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
const pointRadius = 5;

export const AppChart = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes and grid lines first
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // Y axis
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, canvas.height - 50);
    ctx.stroke();

    // X axis
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';

    // Y-axis label
    ctx.fillText('Y', 20, 20);

    // X-axis label
    ctx.fillText('X', canvas.width - 30, canvas.height - 20);

    // Draw grid lines and labels
    for (let i = 1; i <= data[0].points.length; i++) {
      // X axis grid lines
      const x = i * xInterval;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height - 50);
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();

      // X axis labels
      ctx.fillStyle = 'black';
      ctx.fillText(`${i}`, x - 5, canvas.height - 30);
    }

    for (let i = 1; i <= Math.max(...data.flatMap((d) => d.points.map((p) => p.y))); i++) {
      // Y axis grid lines
      const y = canvas.height - i * yInterval - 50;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(canvas.width, y);
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();

      // Y axis labels
      ctx.fillStyle = 'black';
      ctx.fillText(`${i * yInterval}`, 10, y + 5);
    }

    // Draw the points and lines for each dataset
    data.forEach((dataset) => {
      ctx.fillStyle = dataset.color;
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth = 2;

      // Draw lines
      ctx.beginPath();
      dataset.points.forEach((point, index) => {
        const x = point.x * xInterval;
        const y = canvas.height - point.y * yInterval - 50;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw points
      dataset.points.forEach((point) => {
        const x = point.x * xInterval;
        const y = canvas.height - point.y * yInterval - 50;

        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });
    });

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      data.forEach((dataset) => {
        dataset.points.forEach((point) => {
          const x = point.x * xInterval;
          const y = canvas.height - point.y * yInterval - 50;

          if (
            mouseX >= x - pointRadius &&
            mouseX <= x + pointRadius &&
            mouseY >= y - pointRadius &&
            mouseY <= y + pointRadius
          ) {
            console.log(`Hovered over point: (${point.x}, ${point.y}) in ${dataset.label}`);
          }
        });
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef]);

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

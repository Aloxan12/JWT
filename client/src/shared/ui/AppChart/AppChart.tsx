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
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: DataPoint | null;
    label: string | null;
  }>({ x: 0, y: 0, value: null, label: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let found = false;
    data.forEach((dataset) => {
      dataset.points.forEach((point) => {
        const x = point.x * xInterval;
        const y = canvas.height - point.y * yInterval;
        if (Math.abs(mouseX - x) < 5 && Math.abs(mouseY - y) < 5) {
          setTooltip({ x: x + rect.left, y: y + rect.top, value: point, label: dataset.label });
          found = true;
        }
      });
    });

    if (!found) {
      setTooltip({ x: 0, y: 0, value: null, label: null });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Очистка canvas
    ctx.clearRect(0, 0, width, height);

    // Установка осей
    const padding = 50;
    const xStart = padding;
    const yStart = height - padding;
    const xEnd = width - padding;
    const yEnd = padding;

    // Рисование осей
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();

    // Рисование интервалов осей X
    const xRange = xEnd - xStart;
    const xIntervalCount = Math.floor(xRange / xInterval);
    for (let i = 0; i <= xIntervalCount; i++) {
      const x = xStart + i * xInterval;
      ctx.moveTo(x, yStart);
      ctx.lineTo(x, yStart + 10);
      ctx.strokeText(i.toString(), x - 5, yStart + 25);
      ctx.stroke();
    }

    // Рисование интервалов осей Y
    const yRange = yStart - yEnd;
    const yIntervalCount = Math.floor(yRange / yInterval);
    for (let i = 0; i <= yIntervalCount; i++) {
      const y = yStart - i * yInterval;
      ctx.moveTo(xStart, y);
      ctx.lineTo(xStart - 10, y);
      ctx.strokeText(i.toString(), xStart - 25, y + 5);
      ctx.stroke();
    }

    // Рисование данных графика для каждого набора данных
    data.forEach((dataset) => {
      ctx.beginPath();
      ctx.strokeStyle = dataset.color;
      ctx.moveTo(
        xStart + dataset.points[0].x * xInterval,
        yStart - dataset.points[0].y * yInterval
      );
      dataset.points.forEach((point) => {
        const x = xStart + point.x * xInterval;
        const y = yStart - point.y * yInterval;
        ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Рисование точек
      dataset.points.forEach((point) => {
        const x = xStart + point.x * xInterval;
        const y = yStart - point.y * yInterval;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = dataset.color;
        ctx.fill();
      });
    });
  }, [data, xInterval, yInterval]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseMove={handleMouseMove}
      />
      {tooltip.value && tooltip.label && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y - 40,
            background: 'white',
            border: '1px solid black',
            padding: '5px',
          }}
        >
          {`${tooltip.label}: x: ${tooltip.value.x}, y: ${tooltip.value.y}`}
        </div>
      )}
    </div>
  );
};

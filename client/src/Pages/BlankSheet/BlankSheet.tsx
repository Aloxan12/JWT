import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './BlankSheet.scss';

const mock = `<h1>какой-то текст</h1>
        <h2>какой-то текст 2</h2>
        <br />
        компонент
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, voluptates?</p>`;

export const BlankSheet = () => {
  const [value, setValue] = useState(5);
  return (
    <div className={'blank-sheet-wrap'}>
      <button onClick={() => setValue((prevState) => prevState + 5)}>+5</button>
      <div
        dangerouslySetInnerHTML={{
          __html: mock.replace(
            'компонент',
            ReactDOMServer.renderToString(<Counter value={value} />)
          ),
        }}
      />
    </div>
  );
};

interface CounterProps {
  value: number;
}

const Counter = ({ value }: CounterProps) => {
  const [count, setCount] = useState(value);

  useEffect(() => {
    setCount((prevState) => prevState + value);
  }, [value]);

  return (
    <div>
      <button onClick={() => setCount((prevState) => prevState - 1)}>-</button>
      <div>{count}</div>
      <button onClick={() => setCount((prevState) => prevState + 1)}>+</button>
    </div>
  );
};

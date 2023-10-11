import React, { useState } from 'react';
import './BlankSheet.scss';

const data = [1, 2, 3, 4, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const BlankSheet = () => {
  const curData = data.map((item) => ({ value: item, active: true }));
  const [items, setItems] = useState<{ value: number; active: boolean }[]>(curData);

  const handleSort = () => {
    const sortedItems = [...items].sort();
    setItems(sortedItems);
  };

  const onFilter = (even: boolean) => () => {
    const newArr = items.map((item) =>
      item.value % 2 === 0 ? { ...item, active: even } : { ...item, active: !even }
    );
    setItems(newArr);
  };

  return (
    <div className="blank-sheet-wrap">
      <button onClick={handleSort}>Сортировать</button>
      <button onClick={onFilter(false)}>Только зеденые</button>
      <button onClick={onFilter(true)}>Только красные</button>
      <div className="wrap">
        <div className="list">
          {items.map((item, index) => (
            <div
              className={`item${item.value % 2 === 0 ? ' red' : ''}${
                item.active ? ' active' : ' inactive'
              }`}
              key={`${index}-${item.value}`}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

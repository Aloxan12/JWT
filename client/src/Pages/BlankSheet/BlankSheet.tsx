import React, { useState } from 'react';
import './BlankSheet.scss';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const BlankSheet = () => {
  const [] = useState<[]>([]);
  return (
    <div className="blank-sheet-wrap">
      <div className="list">
        {data.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
};

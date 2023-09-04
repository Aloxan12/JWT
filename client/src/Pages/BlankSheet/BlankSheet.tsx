import React, { useEffect, useRef, useState } from 'react';
import './BlankSheet.scss';

interface SliderProps {
  slides: JSX.Element[];
}

const AppSlider: React.FC<SliderProps> = ({ slides }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="slider-container" ref={sliderRef}>
      <div>
        <div>Назад</div>
        <div>Вперед</div>
      </div>
      <div className="slider">
        {slides.map((item, index) => {
          return (
            <div className="item" key={index}>
              {index}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const slides = [<div key={1}>Слайд 1</div>, <div key={2}>Слайд 2</div>, <div key={3}>Слайд 3</div>];

export const BlankSheet = () => {
  return (
    <div className="blank-sheet-wrap">
      <AppSlider slides={slides} />
    </div>
  );
};

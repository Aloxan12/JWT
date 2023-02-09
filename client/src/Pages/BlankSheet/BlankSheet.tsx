import React, { useEffect, useState } from 'react';
import styles from './BlankSheet.module.css';
import { AppInput } from '../../Common/Components/AppInput/AppInput';

export const BlankSheet = () => {
  const [input, setInput] = useState('');

  const changeHandler = (value: string) => {
    setInput(value);
  };

  return (
    <div className={styles.BlankSheetWrap}>
      {/*<AppInput value={input} onChange={changeHandler} type={'textarea'} rows={2} />*/}
      <Slider slides={['Slide 1', 'Slide 2', 'Slide 3']} slideDuration={5} />
    </div>
  );
};

type SliderProps = {
  slides: string[];
  slideDuration: number;
};

const Slider: React.FC<SliderProps> = ({ slides, slideDuration }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timer, setTimer] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seekPercentage, setSeekPercentage] = useState(0);
  const totalDuration = slides.length * slideDuration;

  useEffect(() => {
    if (!paused) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        if (timer >= slideDuration) {
          setTimer(0);
          setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer, slideDuration, slides.length, paused]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = Number(event.target.value);
    setSeekPercentage(newPercentage);
    const newSlide = Math.floor((slides.length * newPercentage) / 100);
    setCurrentSlide(newSlide);
    setTimer(Math.floor((slideDuration * newPercentage) % 100));
  };

  return (
    <div>
      <div>
        Slide {currentSlide + 1} of {slides.length}
      </div>
      <div>{slides[currentSlide]}</div>
      <div>
        <div
          style={{
            width: `${(timer / slideDuration) * 100}%`,
            height: '5px',
            backgroundColor: 'blue',
            transition: 'width 1s linear',
          }}
        ></div>
        <div
          style={{
            width: `${((totalDuration - timer) / totalDuration) * 100}%`,
            height: '5px',
            backgroundColor: 'lightgray',
            transition: 'width 1s linear',
          }}
        ></div>
      </div>
      <input type="range" min={0} max={100} value={seekPercentage} onChange={handleSeek} />
      <button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
    </div>
  );
};

export default Slider;

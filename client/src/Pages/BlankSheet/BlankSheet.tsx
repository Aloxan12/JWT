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
      <Slider
        slides={[
          {
            src: 'data:image/jpeg;base64,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',
            duration: 3000,
          },
          {
            src: 'data:image/jpeg;base64,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',
            duration: 3000,
          },
          {
            src: 'data:image/jpeg;base64,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',
            duration: 3000,
          },
        ]}
      />
    </div>
  );
};

interface SlideProps {
  src: string;
  duration: number;
}

interface TimeLineProps {
  totalDuration: number;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Slider: React.FC<{ slides: SlideProps[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimePassed((timePassed) => timePassed + 1);
      setCurrentSlide((currentSlide) =>
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [slides.length, timePassed]);

  const TimeLine: React.FC<TimeLineProps> = ({ totalDuration, onClick }) => {
    return (
      <div style={{ display: 'flex', width: '100%', height: '30px' }} onClick={onClick}>
        {slides.map(({ duration }, index) => (
          <div
            key={index}
            style={{
              flex: `0 0 ${(duration / totalDuration) * 100}%`,
              height: '100%',
              background:
                index === currentSlide
                  ? 'red'
                  : timePassed >
                    slides.slice(0, index + 1).reduce((acc, { duration }) => acc + duration, 0)
                  ? 'gray'
                  : 'white',
            }}
          />
        ))}
      </div>
    );
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX } = event;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickPosition = clientX - left;
    const slideIndex = Math.floor((clickPosition / width) * slides.length);
    setCurrentSlide(slideIndex);
    setTimePassed(slideIndex * slides[0].duration);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={slides[currentSlide].src} alt="" />
      <TimeLine
        totalDuration={slides.reduce((acc, { duration }) => acc + duration, 0)}
        onClick={handleTimelineClick}
      />
    </div>
  );
};

export default Slider;

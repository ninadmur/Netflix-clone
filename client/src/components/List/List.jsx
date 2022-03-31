import { useState, useRef } from 'react';
import './list.scss';
import ListItem from '../ListItem/ListItem';
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons';

const List = ({ list }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = direction => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        {slideNumber > 0 && (
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick('left')}
          />
        )}
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => {
            return <ListItem key={i} index={i} item={item} />;
          })}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};
export default List;

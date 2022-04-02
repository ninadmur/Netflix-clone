import './listItem.scss';
import { Link } from 'react-router-dom';

import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      const res = await axios.get('/movies/find/' + item, {
        headers: {
          token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2M5ZjQ3ODViMTk1NzMzMTg1Nzc2YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODg2NjY0MiwiZXhwIjoxNjQ5Mjk4NjQyfQ.Hmb4NZWYjzTqKxMM3DMhowNsRzzZ_0jGAyGuJ_1X6K4',
        },
      });
      setMovie(res.data);
    };
    getMovie();
  }, [item]);

  return (
    <Link to="/watch/" state={{ movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.image} alt={movie.title} />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
export default ListItem;

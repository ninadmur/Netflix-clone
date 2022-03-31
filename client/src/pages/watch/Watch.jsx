import { ArrowBackOutlined } from '@material-ui/icons';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import './watch.scss';
const Watch = () => {
  const location = useLocation();
  const movie = location.state.movie;
  const history = useNavigate();
  const goBack = () => {
    history('/', { replace: true });
  };
  return (
    <div className="watch">
      <div className="back" onClick={goBack}>
        <ArrowBackOutlined />
        Home
      </div>

      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
};
export default Watch;

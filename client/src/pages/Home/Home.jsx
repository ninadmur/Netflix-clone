import Featured from '../../components/Featured/Featured';
import List from '../../components/List/List';
import Navbar from '../../components/Navbar/Navbar';
import './home.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './home.scss';
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2M5ZjQ3ODViMTk1NzMzMTg1Nzc2YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODg2NjY0MiwiZXhwIjoxNjQ5Mjk4NjQyfQ.Hmb4NZWYjzTqKxMM3DMhowNsRzzZ_0jGAyGuJ_1X6K4',
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getLists();
  }, [genre, type]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map(list => {
        return <List key={list._id} list={list} />;
      })}
    </div>
  );
};
export default Home;

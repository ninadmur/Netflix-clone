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
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDA5NDRkZmQ3M2MwZGU1NDVmYjRiMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODM5OTQ5MCwiZXhwIjoxNjQ4ODMxNDkwfQ.O2QOW4Ibih5sI-Fy4U-wcmi2fozceHmz36Q1rNDzdK8',
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

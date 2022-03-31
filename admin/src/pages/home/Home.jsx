import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import { userData } from '../../dummyData';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/users/stats', {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDA5NDRkZmQ3M2MwZGU1NDVmYjRiMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODM5OTQ5MCwiZXhwIjoxNjQ4ODMxNDkwfQ.O2QOW4Ibih5sI-Fy4U-wcmi2fozceHmz36Q1rNDzdK8',
          },
        });
        const stats = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        stats.map(item =>
          setUserStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], 'New User': item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

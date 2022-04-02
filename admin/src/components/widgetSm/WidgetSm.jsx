import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('/users?new=true', {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2M5ZjQ3ODViMTk1NzMzMTg1Nzc2YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODg2NjY0MiwiZXhwIjoxNjQ5Mjk4NjQyfQ.Hmb4NZWYjzTqKxMM3DMhowNsRzzZ_0jGAyGuJ_1X6K4',
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  // console.log(newUsers);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => {
          return (
            <li className="widgetSmListItem">
              <img
                src={
                  user.profilePic ||
                  'https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg'
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
                <span className="widgetSmUserTitle">Software Engineer</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

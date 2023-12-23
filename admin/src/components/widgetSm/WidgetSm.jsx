import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { API_URL } from "../../Request";
export default function WidgetSm() {
  const [newUser, setNewUser] = useState([]);
  useEffect(() => {
    async function getNewUser() {
      await axios
        .get(`${API_URL}users?new=true`, {
          headers: {
            token:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDZmZjY4MjM1OWFiMzBmYTRmZWNiZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMzMwMjI3MywiZXhwIjoxNzAzNzM0MjczfQ.hUKodeuBjKblzF2jH5hHMPmWV-Th8lT7BfMnSSoidyQ",
          },
        })
        .then((res) => {
          setNewUser(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getNewUser();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user.profilePic ||
                "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
              }
              alt="User_Profile_Img"
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
             
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

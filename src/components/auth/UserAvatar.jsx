import React, {memo, useEffect, useState} from "react";
import {getUser, getUserAvatar} from "../utils/ApiFunctions.js";
import {Avatar} from "antd";

function UserAvatar({userId, size, reload}) {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        if (userData.imageUrl) {
          const userAvatar = await getUserAvatar(userData.imageUrl);
          setAvatar(userAvatar);
        }
        setUser(userData);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchUser()
  }, [userId, reload])

  return <>
    <Avatar
      size={size}
      src={avatar || user.defaultImageUrl}
      style={{margin: "0 15px 10px 0"}}
    />
  </>
}

export default memo(UserAvatar);
import React, { useState, useEffect } from "react";
import useUserStore from "../hooks/UserStore";

function Settings() {
  const { user, setUser } = useUserStore();
  const [userData, setUserData] = useState({
    avatar: user?.profile?.avatar,
    bio: user?.profile?.bio || '',
  });

  useEffect(() => {
    if (user && user.id) {
      getUser(user.id);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  function getUser(userId) {
    fetch(`/users/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setUserData({
          avatar: data.profile?.avatar,
          bio: data.profile?.bio || '',
        });
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }

  const handleInputChange = (event) => {
    if (event.target.name === "avatar") {
      setUserData({
        ...userData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setUserData({
        ...userData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(user.id, userData);
  };

  function updateUser(userId, userData) {
    const csrftoken = getCookie("csrftoken");
    let formData = new FormData();
    for (let name in userData) {
      formData.append(name, userData[name]);
    }
    fetch(`/profile/${userId}/`, {
      method: "PATCH",
      headers: {
        "X-CSRFToken": csrftoken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        if (data.profile) {
          setUserData((prevState) => ({
            ...prevState,
            avatar: userData.avatar,
            bio: data.profile.bio,
          }));
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }

  function getCookie(name) {
    const cookieValue = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return cookieValue ? cookieValue.pop() : "";
  }

  console.log(userData);
  return (
    <div className="flex items-center justify-center h-screen bg-darker-purp font-dm-sans pt-10">
      <div className="bg-gray-700 rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
        <div className="text-3xl text-center mb-10 pt-2 rounded-t-lg font-bold text-sky-blue">Settings</div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col">
          <label className="text-white">Profile Picture</label>
          <input type="file" name="avatar" onChange={handleInputChange} className="input text-white mb-4 rounded-sm p-3 bg-light-purp focus:outline-none" />
          <label className="text-white">Bio</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            rows={4}
            className="input mb-4 rounded-sm p-3 bg-light-purp focus:outline-none text-white first-line:"
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary rounded-lg text-white py-2 px-4 bg-sky-blue mb-4 max-w-[10rem] translate-x-[8rem]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;

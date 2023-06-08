import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../hooks/UserStore";

function QuestDetail() {
  const { id } = useParams(); 
  const [quest, setQuest] = useState(null)
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user && user.id) {
      getUser(user.id);
    }
  }, []);

  function getUser(userId) {
    fetch(`/users/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
      })
      .catch((error) => {
        console.error("Error fetching user:", error)
      })
  }

  useEffect(() => {
    fetch(`/quests/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setQuest(data);
      })
      .catch((error) => {
        console.error("Error fetching quest:", error);
      });
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  function getTimeDifference(createdAt) {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const timeDifference = Math.abs(currentTime - createdTime);

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 365) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
      return `${years} year${years === 1 ? '' : 's'} ago`;
    }
  }

  if (!quest) {
    return <div>Loading...</div>;
  }

  const timeDifference = getTimeDifference(quest.created_at);

  return (
    <div className="flex items-center justify-center bg-darker-purp min-h-screen overflow-x-hidden pb-20 font-dm-sans">
      <div className="flex w-full max-w-6xl my-4">
        <div className="bg-dark-purp rounded-lg shadow-lg p-4 w-3/4 h-[75vh] max-h-screen overflow-auto mr-4">
          <h1 className="text-3xl text-center text-sky-blue mb-4 font-bold">{quest.title}</h1>
          <p className="text-center text-white">{timeDifference}</p>
          <img src={quest.captain.profile.avatar} alt="Captain" className="h-8 w-8 rounded-full"/>
          <p className="text-sky-blue mb-4">@{quest.captain.username}</p>


          <h2 className="text-xl text-white pt-[24rem]"></h2>
          {quest.comments.map((comment, index) => (
            <div key={index} className="bg-white rounded-sm p-3 mb-4">
              <p>@{comment.user.username}: {comment.body}</p>
            </div>
          ))}
          <input 
            placeholder="Add a comment" 
            className="w-full rounded-sm p-3 bg-purp focus:outline-none mb-4 text-white font-bold"
          />
        </div>

        <div className="bg-dark-purp rounded-lg shadow-lg p-4 w-1/4 h-[75vh] max-h-screen overflow-auto">
          <h2 className="text-xl text-white">Participants</h2>
          {quest.participants.map((participant, index) => (
            <div key={index} className="bg-purp rounded-sm p-3 mb-4 text-cement">
              <img src={participant.profile.avatar} alt="Participant avatar" />
              <p>@{participant.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestDetail;


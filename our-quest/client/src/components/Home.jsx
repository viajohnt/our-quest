import React, { useState, useEffect } from "react"
import QuestList from "./QuestList"
import useUserStore from "../hooks/UserStore"
import { Link } from "react-router-dom";

function Home() {
  const [quests, setQuests] = useState([]);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    getQuests();
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

  function getQuests() {
    fetch("/quests/")
      .then((response) => response.json())
      .then((data) => {
        setQuests(data);
      })
      .catch((error) => {
        console.error("Error fetching quests:", error)
      });
  }

  function deleteQuest(id) {
    const csrftoken = getCookie('csrftoken')

    fetch(`/quests/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": csrftoken
      }
    })
      .then(() => {
        getQuests()
      })
      .catch((error) => {
        console.error("Error deleting quest:", error)
      })
  }

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
    return cookieValue ? cookieValue.pop() : ''
  }

  return (
    <div className=" bg-darker-purp">
      <div className="flex justify-between items-center w-[36rem] mx-auto mb-10 pt-10">
        <div>
          <p className="text-2xl text-white">Quests</p>
          <p className="text-blue-300">Available Quests: {quests.length}</p>
        </div>
        <Link to="/create_quest" className="btn btn-primary rounded-md text-white py-2 px-4 bg-blue-400">Create Quest</Link>
      </div>
      <div className="grid grid-rows-8 gap-4 justify-items-center">
        {quests.map((quest) => (
          <QuestList key={quest.id} quest={quest} deletion={deleteQuest} />
        ))}
      </div>
    </div>
)}

export default Home;

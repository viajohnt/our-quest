import React, { useState, useEffect } from "react"
import QuestList from "./QuestList"
import useUserStore from "../hooks/UserStore"

function Quest() {
  const [quests, setQuests] = useState([])
  const [formQuest, setFormQuest] = useState({
    title: "",
    content: "",
    topic: "",
    public: false 
});
  const { user,setUser } = useUserStore()

  useEffect(() => {
    getQuests()
    if (user && user.id) {
        getUser(user.id)
    }
}, [])

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

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
    return cookieValue ? cookieValue.pop() : ''
  }
  
  function createQuest(event) {
    event.preventDefault();
    const csrftoken = getCookie('csrftoken');

    fetch("/quests/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: JSON.stringify({
        title: formQuest.title,
        content: formQuest.content,
        topic: parseInt(formQuest.topic), 
        public: formQuest.public === "true",
        participants: [user.id],  // Add this line
      }),
    })
    .then(() => {
        getQuests();
        setFormQuest({
          title: "",
          content: "",
          topic: "", 
          public: false 
        });
    })
    .catch((error) => {
      console.error("Error creating quest:", error)
    })
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

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox" 
        ? setFormQuest(prevQuest => ({...prevQuest, [name]: checked}))
        : setFormQuest(prevQuest => ({...prevQuest, [name]: value}));
}

  return (
    <div className="">
<form className="create-note" onSubmit={createQuest}>
    <input
      onChange={handleChange}
      name="title"
      placeholder="Title"
      value={formQuest.title}
    />
    <input
      onChange={handleChange}
      name="content"
      placeholder="Make a quest..."
      value={formQuest.content}
    />
    <input
      onChange={handleChange}
      name="topic"
      placeholder="Topic ID"
      value={formQuest.topic}
      type="number"  // Add this line
    />
    <input
      type="checkbox"
      onChange={handleChange}
      name="public"
      checked={formQuest.public}
    />
    <label htmlFor="public">Public</label>
    <button
      className="submit-button"
      type="submit"
    >+</button>
</form>
      {quests.map((quest) => (
        <QuestList
          key={quest.id}
          id={quest.id}
          title={quest.title}
          content={quest.content}
          deletion={deleteQuest}
          topic={quest.topic}
          captain={quest.captain}
        />
      ))}
    </div>
  );
}

export default Quest

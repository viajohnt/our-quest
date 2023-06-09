import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useUserStore from "../hooks/UserStore"

function Quest() {
  const [formQuest, setFormQuest] = useState({
    title: "",
    content: "",
    topic: "",
    public: false,
  })

  const [newTopicName, setNewTopicName] = useState("")
  const [creatingTopic, setCreatingTopic] = useState(false)
  const [topicOptions, setTopicOptions] = useState([])
  const { user } = useUserStore()

  useEffect(() => {
    fetch("/topics/")
      .then((response) => response.json())
      .then((data) => {
        setTopicOptions(data)
      })
      .catch((error) => {
        console.error("Error fetching topics:", error)
      })
  }, [])

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    if (name === "topic") {
      setNewTopicName("")
      const selectedTopic = topicOptions.find(
        (topic) => topic.id === parseInt(value)
      )
      setFormQuest((prevQuest) => ({
        ...prevQuest,
        [name]: selectedTopic ? selectedTopic.id : "",
      }))
    } else {
      type === "checkbox"
        ? setFormQuest((prevQuest) => ({
            ...prevQuest,
            [name]: checked,
          }))
        : setFormQuest((prevQuest) => ({
            ...prevQuest,
            [name]: value,
          }))
    }
  }

  function handleNewTopicChange(event) {
    setNewTopicName(event.target.value)
    setFormQuest((prevQuest) => ({ ...prevQuest, topic: "" }))
  }

  function handleCreateTopic(event) {
    event.preventDefault()

    const csrftoken = getCookie("csrftoken")

    fetch("/topics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        name: newTopicName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTopicOptions((prevTopics) => [...prevTopics, data])
        setFormQuest((prevQuest) => ({
          ...prevQuest,
          topic: data.id.toString(),
        }))
        setCreatingTopic(false)
      })
      .catch((error) => {
        console.error("Error creating topic:", error)
      })
  }

  function createQuest(event) {
    event.preventDefault()
    const csrftoken = getCookie("csrftoken")

    const createQuestWithTopic = (topicId) => {
      fetch("/quests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          captain_id: user.id, 
          title: formQuest.title,
          content: formQuest.content,
          topic: topicId,
          public: formQuest.public,
          participants: [user.id],
        }),        
      })
        .then(() => {
          setFormQuest({
            title: "",
            content: "",
            topic: "",
            public: false,
          })
        })
        .catch((error) => {
          console.error("Error creating quest:", error)
        })
    }

    if (newTopicName) {
      fetch("/topics/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          name: newTopicName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          createQuestWithTopic(data.id)
        })
        .catch((error) => {
          console.error("Error creating topic:", error)
        })
    } else {
      createQuestWithTopic(formQuest.topic)
    }
  }

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
    return cookieValue ? cookieValue.pop() : ''
  }

return (
  <div className="flex items-center justify-center h-screen bg-gray-600 font-dm-sans pt-[8rem]">
    <div className="bg-gray-700 rounded-lg shadow-lg p-12 w-full max-w-lg translate-y-[-8rem]">
      {user ? (
        <>
          <div className="text-3xl text-center text-white mb-10 pt-2 rounded-t-lg font-bold">Create Quest</div>
          <form className="create-note" onSubmit={createQuest}>
            <div className="mb-4">
              <input
                onChange={handleChange}
                name="title"
                placeholder="Title"
                value={formQuest.title}
                className="input rounded-sm p-3 bg-white w-full focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <input
                onChange={handleChange}
                name="content"
                placeholder="Brief description"
                value={formQuest.content}
                className="input rounded-sm p-3 bg-white w-full focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              {topicOptions.length > 0 ? (
                <select
                  onChange={handleChange}
                  name="topic"
                  value={formQuest.topic.toString()}
                  className="input rounded-sm p-3 bg-white w-full focus:outline-none"
                  required
                >
                  <option value="">Select a topic</option>
                  {topicOptions.map((topic) => (
                    <option key={topic.id} value={topic.id.toString()}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Loading topics...</p>
              )}
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setCreatingTopic(true)}
                className="btn btn-primary rounded-full text-white py-2 px-4 bg-blue-500 mb-4"
              >
                Create New Topic
              </button>
              {creatingTopic && (
                <div>
                  <input
                    onChange={handleNewTopicChange}
                    name="newTopic"
                    placeholder="New Topic"
                    value={newTopicName}
                    className="input rounded-sm p-3 bg-white w-full focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCreateTopic}
                    className="btn btn-primary rounded-full text-white py-2 px-4 bg-blue-500 mb-4 mt-4"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreatingTopic(false)}
                    className="btn btn-primary rounded-full text-white py-2 px-4 bg-gray-500 mb-4 translate-x-5"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4 flex items-center translate-x-[10.5rem]">
              <input
                type="checkbox"
                onChange={handleChange}
                name="public"
                checked={formQuest.public}
                className="mr-2 focus:outline-none"
              />
              <label htmlFor="public" className="text-white ">PUBLIC</label>
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-lg text-white py-2 px-4 bg-light-blue mb-4 translate-x-[10.3rem] font-bold"
            >SUBMIT</button>
          </form>
          <Link to="/" className="text-center text-blue-500 hover:underline block">Back to Quests</Link>
        </>
      ) : (
        <div className="text-3xl text-center text-red-500 mb-10 pt-2 rounded-t-lg font-bold">
          You must be signed in to create a quest
        </div>
      )}
    </div>
  </div>
)

}

export default Quest

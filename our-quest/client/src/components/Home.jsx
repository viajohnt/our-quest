import React, { useState, useEffect } from "react"
import QuestList from "./QuestList"
import TopicList from "./TopicList"
import CaptainList from "./CaptainList"
import useUserStore from "../hooks/UserStore"
import { Link } from "react-router-dom"

function Home() {
  const [quests, setQuests] = useState([])
  const [topics, setTopics] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTopic, setCurrentTopic] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [captains, setCaptains] = useState([])
  const questsPerPage = 8
  const { user, setUser } = useUserStore()

  useEffect(() => {
    getQuests()
    getTopics()
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
      .then((questsData) => {
        const promises = questsData.map((quest) => 
          fetch(`/topics/${quest.topic}/`)
            .then((response) => response.json())
            .then((topicData) => ({
              ...quest,
              topicName: topicData.name,
            }))
        )
        Promise.all(promises).then((quests) => {
          setQuests(quests)
        })
      })
      .catch((error) => {
        console.error("Error fetching quests:", error)
      })
  }

  function getTopics() {
    fetch("/topics/")
      .then((response) => response.json())
      .then((topicsData) => {        
        setTopics(topicsData)
      })
      .catch((error) => {
        console.error("Error fetching topics:", error)
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

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
    return cookieValue ? cookieValue.pop() : ''
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value)
  }

  const getCurrentQuests = () => {
    const indexOfLastQuest = currentPage * questsPerPage
    const indexOfFirstQuest = indexOfLastQuest - questsPerPage
    return filteredQuests.slice(indexOfFirstQuest, indexOfLastQuest)
  }

  useEffect(() => {
    if (quests.length > 0) {
      const uniqueCaptains = [...new Map(quests.map(quest => [quest.captain.id, quest.captain])).values()]
      setCaptains(uniqueCaptains)
    }
  }, [quests])

  const filteredQuests = quests
    .filter(quest => quest.topicName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(quest => currentTopic ? quest.topicName.toLowerCase() === currentTopic.toLowerCase() : true)

  const totalPages = Math.ceil(quests.length / questsPerPage)

  const changePage = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-darker-purp min-h-screen overflow-x-hidden">
      <div className="flex">
        <div className="w-1/5 p-4 ml-20">
          <TopicList topics={topics} setCurrentTopic={setCurrentTopic} />
        </div>
        <div className="w-2/4">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search by topic..."
              value={searchTerm}
              onChange={handleSearch}
              className="mt-5 mb-5 bg-light-purp w-[20rem] h-12 text-lg rounded-md text-white focus:outline-none pl-4"
            />
          </div>
          <div className="flex justify-between items-center w-[36rem] mx-auto mb-10 pt-10">
            <div>
              <p className="text-2xl text-white">Quests</p>
              <p className="text-blue-300">Available Quests: {quests.length}</p>
            </div>
            <Link
              to="/create_quest"
              className="btn btn-primary rounded-md text-white py-2 px-4 bg-blue-400"
            >
              Create Quest
            </Link>
          </div>
          <div className="grid grid-rows-8 gap-4 justify-items-center">
            {filteredQuests.length > 0 ? (
              getCurrentQuests().map((quest) => (
                <QuestList key={quest.id} quest={quest} deletion={deleteQuest} />
              ))
            ) : (
              <div className="flex justify-center items-center text-white text-xl">
                No quests found...
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            {[...Array(totalPages <= 7 ? totalPages : 7)].map((e, i) => (
              <button
                key={i + 1}
                onClick={() => changePage(i + 1)}
                className={`mr-2 py-1 px-3 rounded mb-[5rem] mt-[3rem] ${
                  currentPage === i + 1
                    ? 'bg-light-purp text-white hover:text-blue-400'
                    : 'bg-light-purp text-white hover:text-blue-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
            {totalPages > 7 && (
              <button
                onClick={() => changePage(currentPage + 1)}
                className="py-1 px-3 rounded bg-light-purp text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="w-1/5 p-4 ml-20">
          <CaptainList captains={captains} />
        </div>
      </div>
    </div>
  )
}

export default Home

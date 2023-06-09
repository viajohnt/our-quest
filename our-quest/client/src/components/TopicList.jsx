function TopicList({ topics, setCurrentTopic }) {
    const sortedTopics = [...topics].sort((a, b) => b.questCount - a.questCount);
    return (
      <div className="rounded-md p-4 ml-7 w-[17rem] mt-[6.4rem] text-cement">
        <p className="text-xl text-white mb-2">Topics</p>
        <p
          onClick={() => setCurrentTopic(null)}
          className="cursor-pointer hover:text-blue-300 mt-2 text-light-blue"
        >
          All
        </p>
        {sortedTopics.map(({ id, name, questCount }) => (
          <div key={id} className="flex items-center justify-between mt-8">
            <p
              onClick={() => setCurrentTopic(name)}
              className="text-cement cursor-pointer hover:text-blue-300"
            >
              {name} ({questCount})
            </p>
            <button className="rounded-sm bg-dark-purp text-cement py-1 px-2 ml-2 hover:bg-blue-500 w-14">
              Join
            </button>
          </div>
        ))}
      </div>
    );
  }
  
  export default TopicList;
  
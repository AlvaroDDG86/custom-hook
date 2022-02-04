import React, { useState, useEffect } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const [ isLoading, error, fetchData ] = useHttp()

  useEffect(() => {
    fetchData(
      {url: "https://react-tasks-bb7ce-default-rtdb.firebaseio.com/tasks.json"},
      (listTasksFromHook) => {
        const loadedTasks = [];
        for (const taskKey in listTasksFromHook) {
          loadedTasks.push({ id: taskKey, text: listTasksFromHook[taskKey].text });
        }
        setTasks(loadedTasks);
      }
    );
  }, [fetchData]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchData}
      />
    </React.Fragment>
  );
}

export default App;

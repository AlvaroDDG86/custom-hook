import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [isLoading, error, fetchData ] = useHttp()

  // const withOutNestingFunctions = (taskText, taskDataFromHook) => {
  //   const generatedId = taskDataFromHook.name;
  //   const createdTask = { id: generatedId, text: taskText };
  //   props.onAddTask(createdTask);
  // }

  const enterTaskHandler = (taskText) => {
    const requestConfig = {
      url: "https://react-tasks-bb7ce-default-rtdb.firebaseio.com/tasks.json",
      method: 'POST',
      body: {
        text: taskText
      }
    }
    fetchData(
      requestConfig,
      (taskDataFromHook) => {
        const generatedId = taskDataFromHook.name;
        const createdTask = { id: generatedId, text: taskText };
        props.onAddTask(createdTask);
      }
    )
    // withOutNestingFunctions.bind(null, taskText)
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

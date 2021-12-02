import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    if (tasks.find(task => task.title === data.title)) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
      return
    }

    setTasks(oldstate => [...oldstate, data]);
  }

  function handleToggleTaskDone(id: number) {
    const toggledTask = tasks.map((task) =>
      task.id === id
        ? { ...task, done: !task.done }
        : task)

    setTasks(toggledTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          ))
        }
      ]
    );
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const toggledTask = tasks.map((task) =>
      task.id === id
        ? { ...task, title: taskNewTitle }
        : task)

    setTasks(toggledTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
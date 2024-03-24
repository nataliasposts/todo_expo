import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ImageBackground, View } from "react-native";
import { Task } from "../types/types";
import Header from "../components/Header/Header";
import TaskList from "../components/TaskList/TaskList";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EditingForm from "../components/EditingForm/EditingForm";

const defautTask = [
  {
    id: Math.random().toString().substring(7),
    body: "Do some stuff",
    status: false,
  },
];

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
});

const MainScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>(defautTask);

  const [modalVisible, setModalVisible] = useState("none");
  const [editInputValue, setEditInputValue] = useState("");
  const [itOfEditingItem, setItOfEditingItem] = useState("");
  const [_, setSortedTasks] = useState<Task[]>([]);

  const addTask = (taskBody: string) => {
    const newTask = {
      id: Math.random().toString().substring(7),
      body: taskBody,
      status: false,
    };
    setTasks([...tasks, newTask]);
    cancelEditing();
  };

  const editTask = () => {
    const taskEditing = tasks.find((i) => i.id === itOfEditingItem);
    taskEditing.body = editInputValue;
    setTasks([...tasks]);
    cancelEditing();
  };

  const changeItemStatus = (itemId: string) => {
    const taskUpd = tasks.find((i) => i.id === itemId);
    taskUpd.status = !taskUpd.status;
    setTasks([...tasks]);
  };

  const deleteItem = (itemId: string) => {
    setTasks(tasks.filter((item) => item.id !== itemId));
  };

  const cancelEditing = () => {
    setModalVisible("none");
    setEditInputValue("");
  };

  useEffect(() => {
    setSortedTasks(
      tasks.sort(
        (a, b) =>
          Number(b.status < a.status) - Number(a.status < b.status) ||
          Number(b.body < a.body) - Number(a.body < b.body)
      ) || []
    );
  }, [tasks]);

  return (
    <SafeAreaProvider>
      <View>
        <StatusBar style="light" />
        <SafeAreaView style={styles.main}>
          <Header setModalVisible={setModalVisible} navigation={navigation} />
          <ScrollView>
            <TaskList
              tasks={tasks}
              deleteItem={deleteItem}
              setItOfEditingItem={setItOfEditingItem}
              setModalVisible={setModalVisible}
              setEditInputValue={setEditInputValue}
              changeItemStatus={changeItemStatus}
            />
            <EditingForm
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              addTask={addTask}
              editInputValue={editInputValue}
              setEditInputValue={setEditInputValue}
              cancelEditing={cancelEditing}
              editTask={editTask}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

export default MainScreen;

// Imports
import { Platform, StyleSheet, Text } from "react-native";
//Import useState to persist values across re-renders
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import ImageInputList from "../components/ImageInputList";
import TaskFilters from "../components/TaskFilters";
import TaskItem from "../components/TaskItem";

// Functional component
export default function Tasks() {
  // Task data (a static array for this lesson).
  const initialTasks = [
    { id: 1, title: "Study", completed: false },
    { id: 2, title: "Gym", completed: true },
    { id: 3, title: "Shopping", completed: false },
    { id: 4, title: "Game", completed: false },
    { id: 5, title: "Movies", completed: false }
  ];

  //Store tasks in state
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState("");
  const [newPhotos, setNewPhotos] = useState([]);
  const [error, setError] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("All");

  // filter returns an array; find returns the first matching task.
  const completedTasks = tasks.filter((task) => task.completed === true);

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed === true).length;
  const activeCount = totalCount - completedCount;

  //A useEffect to hook into Tasks
  //This useEffect will be called automatically when this component mounts (only once)
  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem("MY_TASKS_KEY");
        console.log("Saved Tasks: ", savedTasks);

        const storedTasks = JSON.parse(savedTasks);
        if (Array.isArray(storedTasks)) setTasks(storedTasks);
      } catch {
        console.log("Could not load saved tasks");
      }
    }

    loadTasks();
  }, []);

  //This useEffect will be called automatically whenever "Tasks" changes
  useEffect(() => {
    console.log("Tasks updated: ", tasks);

    //Try and save the updated tasks to AsyncStorage
    async function saveTasks() {
      try {
        await AsyncStorage.setItem("MY_TASKS_KEY", JSON.stringify(tasks));
      } catch {
        console.log("Could not save tasks.");
      }
    }

    saveTasks();
  }, [tasks])


  function addPhoto(uri) {
    setNewPhotos(function (currentPhotos) {
      if (currentPhotos.includes(uri)) return currentPhotos;
      return currentPhotos.concat(uri);
    });
  }

  function removePhoto(uri) {
    setNewPhotos(function (currentPhotos) {
      return currentPhotos.filter(function (photo) {
        return photo !== uri;
      });
    });
  }

  function addTask() {
    //check for empty title
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle.length === 0) {
      setError("Please enter a task title");
      return;
    }
    setTasks((currentTasks) => {
      const nextId = Math.max(0, ...currentTasks.map((task) => task.id)) + 1;
      /* EXPLANATION:
         Find the largest ID, then add 1.
         map extracts the IDs: [{ id: 1 }, { id: 2 }] becomes [1, 2].
         (task) => task.id returns the ID of each task automatically.
         ... spreads those IDs into separate Math.max arguments:
         Math.max(0, ...[1, 2]) means Math.max(0, 1, 2).
         The initial 0 also makes the expression work with an empty array.

         The loop below calculates the same nextId without map or spread.

         SIMPLE FORM:
         let largestId = 0;
         for (let i = 0; i < currentTasks.length; i++) {
           if (currentTasks[i].id > largestId) {
             largestId = currentTasks[i].id;
           }
         }
         const nextId = largestId + 1;
      */

      return [...currentTasks,
      {
        id: nextId,
        title: trimmedTitle,
        completed: false,
        photos: newPhotos
      }
      ]
      /* EXPLANATION:
         Copy the array, then append one task.
         ...currentTasks copies the existing items into a NEW array.
         This is different from ... inside Math.max, which supplies arguments.
         This commented code REPLACES the return above; do not run both.

         SIMPLE FORM:
         const updatedTasks = [];
         for (let i = 0; i < currentTasks.length; i++) {
           updatedTasks.push(currentTasks[i]);
         }
         updatedTasks.push({
           id: nextId,
           title: trimmedTitle,
           completed: false
         });
         return updatedTasks;
      */
    })
    setNewTitle("");
    setNewPhotos([]);
    setError("");
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
    /* EXPLANATION:
       filter keeps the tasks for which the condition is true.
       Unlike map, filter can produce a shorter array.
       task.id !== id keeps every task except the one being deleted.

       SIMPLE FORM:
       setTasks(function (currentTasks) {
         const remainingTasks = [];
         for (let i = 0; i < currentTasks.length; i++) {
           const task = currentTasks[i];
           if (task.id !== id) {
             remainingTasks.push(task);
           }
         }
         return remainingTasks;
       });
    */
  }

  function isActive(task) {
    return task.completed === false;
  }

  function getVisibleTasks() {
    if (selectedFilter === "Completed") {
      return completedTasks;
    }
    if (selectedFilter === "Active") {
      return tasks.filter(isActive);
    }
    return tasks;
  }

  const visibleTasks = getVisibleTasks();

  function openAbout() {
    router.push("/about")
  }

  function openTaskDetails(task) {
    router.push({
      pathname: "/details",
      params: {
        taskId: task.id,
        taskTitle: task.title,
        taskStatus: task.completed,
        photoUris: JSON.stringify(task.photos ?? [])
      }
    })
  }

  function openHTTPRequestPage() {
    router.push("httprequest");
  }

  // Render the task lists with JSX.
  return (
    <AppScreen>
      <Text style={styles.heading}>My Tasks</Text>
      <Text style={styles.subtitle}>A clearer day!</Text>

      <AppButton text="Online Http tasks demo" onPress={openHTTPRequestPage} />

      <AppButton text="About this app" onPress={openAbout} />

      {/* Add Task Form */}
      <AppTextInput onSubmitEditing={addTask} style={styles.input} value={newTitle} onChangeText={setNewTitle} placeholder="What do you feel like doing?" />
      {Platform.OS !== "web" && (
        <ImageInputList imageUris={newPhotos} onAddImage={addPhoto} onRemoveImage={removePhoto} />
      )}
      <AppButton text="Add Task" onPress={addTask} />

      {error && <Text style={styles.error}>{error}</Text>}
      {/* End of Add Task Form */}

      <Text style={styles.section}>Your Tasks</Text>

      <TaskFilters onChange={setSelectedFilter} selected={selectedFilter} />


      <Text style={styles.subtitle}>Total: {totalCount} | Active: {activeCount} | Completed: {completedCount} </Text>
      {visibleTasks.length > 0 && visibleTasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={deleteTask} onOpen={openTaskDetails} />
      ))}


    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 34,
    fontWeight: "800",
    color: "#203B35"
  },
  section: {
    fontSize: 20, fontWeight: "bold", marginTop: 24, marginBottom: 12, color: "#203B35"
  },
  subtitle: {
    fontSize: 15,
    color: "#61736b",
    marginBottom: 20
  },

  input: { backgroundColor: "white", borderWidth: 1, borderColor: "#A9BCAF", borderRadius: 10, padding: 12, fontSize: 20, color: "#203B35", marginVertical: 8 },
  error: {
    color: "#A03026", marginVertical: 6
  }

})

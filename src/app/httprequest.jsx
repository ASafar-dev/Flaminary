import { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";

export default function HttpRequest() {

    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const tasksURL = "https://jsonplaceholder.typicode.com/todos?_limit=5"

    useEffect(() => {
        getTasks();
    }, []);


    //demoPostData
    //Demo Task 
    const demoTask =
    {
        title: "This is a demo Task",
        completed: false,
        userId: 1
    }

    async function postTask() {
        if (loading) return;
        setLoading(true);
        setError("");

        try {
            const response = await fetch(tasksURL,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(demoTask)
                },
            );

            if (!response.ok) throw new Error("POST failed ", response.status);
            const data = await response.json();

            console.log("Posted Task : ", data)


        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }

    }



    // getTasks is using the fetch API, hence it should be async
    async function getTasks() {
        //if i'm already loading tasks, exit
        if (loading) return;
        setLoading(true);
        setError("");

        try {
            const response = await fetch(tasksURL);
            if (!response.ok) throw new Error("GET failed " + response.status);
            const data = await response.json();
            setTasks(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppScreen>

            <Text>Online Http Requests from JSONPlaceholder</Text>
            <AppButton text="Get sample tasks" onPress={getTasks} />
            <AppButton text="Post a demo task" onPress={postTask} />

            {loading && <ActivityIndicator style={{ marginTop: 20 }} color="red" size="large" />}
            {error !== "" && <Text>{error}</Text>}

            {tasks !== null && tasks.map(function (task) {
                return <Text key={task.id}>
                    {task.id} -
                    {task.title} -
                    {task.completed ? "Done" : "Open"}
                </Text>;
            })}



        </AppScreen>
    )
}
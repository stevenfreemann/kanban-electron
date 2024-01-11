import { Button, Card, Flex, Form, Input, Layout, Divider } from "antd";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import { useAuth } from "../AuthContext";

interface taskType {
  id: number;
  title: string;
  description: string;
  list: string;
}
function Kanban() {
  const { handleLogout, userData, token } = useAuth();
  const [tasks, setTasks] = useState<taskType[]>([]);

  console.log("tasks :>> ", tasks);

  /*   const organizeTasks = (tasksData: taskType[]) => {
    const todoTasks = tasksData.filter((task) => task.list === 'todo');
    const doingTasks = tasksData.filter((task) => task.list === 'doing');
    const doneTasks = tasksData.filter((task) => task.list === 'done');

    setTodoList(todoTasks);
    setDoingList(doingTasks);
    setDoneList(doneTasks);
  }; */
  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(
        `https://kanban-back-ctja.onrender.com/tasks/by_user/${userData?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: taskType[] = await response.json();
      setTasks(data);
    };
    getTasks();
  }, []);

  const onDragEnd = async (result: any) => {
    console.log("result :>> ", result);
    if (!result.destination) {
      return;
    }

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks[result.source.index];
    console.log("movedTask :>> ", movedTask);
    movedTask.list = result.destination.droppableId;

    // Update the task in the database
    await fetch(`https://kanban-back-ctja.onrender.com/tasks/${movedTask.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list: movedTask.list }),
    });

    setTasks(updatedTasks);
  };

  const onSubmitHandler = async (values: any) => {
    const task = { ...values, list: "todo" };
    const res = await fetch(
      `https://kanban-back-ctja.onrender.com/tasks/by_user/${userData?.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const taskCreated = await res.json();
    delete taskCreated.user;
    const tempTasks = [...tasks, taskCreated];
    setTasks(tempTasks);
  };
  return (
    <Layout>
      <div style={{ width: "30%" }}>
        <h2>{userData?.name}</h2>
        <Button onClick={() => handleLogout()} size="large">
          Cerrar sesion
        </Button>
      </div>
      <div style={{ width: "20%" }}>
        <Form name="create_task" onFinish={onSubmitHandler}>
          <Form.Item
            htmlFor="title"
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Minimo 6 caracteres",
                min: 6,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            htmlFor="description"
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button size="large" htmlType="submit">
            Crear tarea
          </Button>
        </Form>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex>
          <Droppable droppableId="todo" key="todo">
            {(provided: DroppableProvided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: "30%" }}
              >
                <h2>Todo</h2>
                {tasks.map((task, index) => {
                  if (task.list === "todo") {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card
                              title={task.title}
                              style={{ marginBottom: "10px" }}
                            >
                              <p>{task.description}</p>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Divider type="vertical" style={{ height: "100vh" }} />
          <Droppable droppableId="doing" key="doing">
            {(provided: DroppableProvided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: "30%" }}
              >
                <h2>Doing</h2>
                {tasks.map((task, index) => {
                  if (task.list === "doing") {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card
                              title={task.title}
                              style={{ marginBottom: "10px" }}
                            >
                              <p>{task.description}</p>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Divider type="vertical" style={{ height: "100vh" }} />
          <Droppable droppableId="done" key="done">
            {(provided: DroppableProvided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: "30%" }}
              >
                <h2>Done</h2>
                {tasks.map((task, index) => {
                  if (task.list === "done") {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card
                              title={task.title}
                              style={{ marginBottom: "10px" }}
                            >
                              <p>{task.description}</p>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Flex>
      </DragDropContext>
    </Layout>
  );
}

export default Kanban;

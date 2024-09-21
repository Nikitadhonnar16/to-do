import React, { useState } from "react";
import { PiListChecksBold } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { Dropdown } from "react-bootstrap"; // Import Dropdown from react-bootstrap

import Data from "../assets/api/taskService.json";
import "../assets/css/TaskList.css";
import AddNewTask from "./AddNewTask";
import EditTask from "./EditTask"; // Import EditTask component

const TaskList = () => {
  const [data, setData] = useState(Data);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowModal = () => setShowAddModal(true);
  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditTask(null);
    setShowEditModal(false);
  };

  const handleAddTask = (newTask) => {
    setData([...data, newTask]);
  };

  const handleDeleteTask = (id) => {
    setData(data.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setData(
      data.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    handleCloseModal();
  };

  return (
    <div>
      <div
        className="task-list-wrapper container w-50"
        style={{ filter: showAddModal || showEditModal ? "blur(4px)" : "none" }}
      >
        <div>
          <div className="row mt-3">
            <div className="col d-flex gap-2">
              <div className="mt-2">
                <PiListChecksBold
                  size={45}
                  className="rounded-3"
                  style={{ backgroundColor: "maroon", color: "white" }}
                />
              </div>
              <div>
                <h3 className="fw-">Tasks</h3>
                <h5 className="fw-normal">All Tasks</h5>
              </div>
            </div>

            <div className="col">
              <div>
                <button className="btn btn-new" onClick={handleShowModal}>
                  New Task
                </button>
                <button className="btn btn-refresh">Refresh</button>
              </div>
              <div className="search rounded-1 mt-2">
                <input
                  type="text"
                  className="ms-1 search-field"
                  placeholder="Search"
                />
                <IoIosSearch
                  style={{ color: "grey" }}
                  size={20}
                  className="ms-2"
                />
              </div>
            </div>
          </div>
          <h6 className="">4 records </h6>
        </div>
        <div>
          <div className="row bg-white table-list list-heading gap-0">
            <div className="col-auto text-end p-0 d-flex align-items-center">
              <input type="checkbox" className="m-0 p-0 ms-3" />
            </div>
            <div className="col p-0 text-center">Assigned To</div>
            <div className="col p-0 ms-1 text-center">Status</div>
            <div className="col p-0 ms-1 text-center">Due Date</div>
            <div className="col p-0 ms-1 text-center">Priority</div>
            <div className="col p-0 text-center">Comments</div>
            <div className="col p-0 text-center">Actions</div>
          </div>

          {data.map((cur) => (
            <div className="row bg-white table-list gap-0" key={cur.id}>
              <div className="col-auto text-end p-0 d-flex align-items-center">
                <input type="checkbox" className="m-0 p-0 ms-3" />
              </div>
              <div className="col p-0 text-center">{cur.name}</div>
              <div className="col p-0 ms-1 text-center">{cur.status}</div>
              <div className="col p-0 ms-1 text-center">{cur.due_date}</div>
              <div className="col p-0 ms-1 text-center">{cur.priority}</div>
              <div className="col p-0 text-center">{cur.comments}</div>
              <div className="col p-0 text-center">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id={`dropdown-${cur.id}`}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditTask(cur)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteTask(cur.id)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddNewTask
        show={showAddModal}
        onClose={handleCloseModal}
        onAddTask={handleAddTask}
      />
      {showEditModal && (
        <EditTask
          show={showEditModal}
          onClose={handleCloseModal}
          onUpdateTask={handleUpdateTask}
          initialData={editTask} // Pass the task data to edit
        />
      )}
    </div>
  );
};

export default TaskList;

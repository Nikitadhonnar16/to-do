import React, { useState } from "react";
import { PiListChecksBold } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { Dropdown, Modal, Button } from "react-bootstrap";
import AddNewTask from "./AddNewTask";
import EditTask from "./EditTask";

import Data from "../assets/api/taskService.json";
import "../assets/css/TaskList.css";

const TaskList = () => {
  const [data, setData] = useState(Data); // Initial data
  const [showAddModal, setShowAddModal] = useState(false); // State for Add Task modal
  const [editTask, setEditTask] = useState(null); // State for task to be edited
  const [showEditModal, setShowEditModal] = useState(false); // State for Edit Task modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for Delete Task modal
  const [taskToDelete, setTaskToDelete] = useState(null); // Task to be deleted
  const [page, setPage] = useState(1); // Current page number for pagination
  const [pageSize, setPageSize] = useState(4); // Number of tasks per page, default at 4
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Show Add Task modal
  const handleShowModal = () => setShowAddModal(true);
  // Close modals
  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditTask(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  // Add new task to list
  const handleAddTask = (newTask) => {
    setData([...data, newTask]);
  };

  // Open edit modal with selected task
  const handleEditTask = (task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  // Open delete modal with selected task
  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  // Confirm and delete task
  const handleConfirmDeleteTask = () => {
    if (taskToDelete) {
      setData(data.filter((task) => task.id !== taskToDelete.id));
      handleCloseModal();
    }
  };

  // Update task after editing
  const handleUpdateTask = (updatedTask) => {
    setData(
      data.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    handleCloseModal();
  };

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to first page when page size changes
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when search changes
  };

  // Filter tasks based on search term
  const filteredTasks = data.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredTasks.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePrevious = () => setPage(page > 1 ? page - 1 : 1);
  const handleNext = () => setPage(page < totalPages ? page + 1 : totalPages);
  const handleFirst = () => setPage(1);
  const handleLast = () => setPage(totalPages);

  const startItem = (page - 1) * pageSize;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div>
      <div
        className="task-list-wrapper container w-50"
        style={{
          filter:
            showAddModal || showEditModal || showDeleteModal
              ? "blur(4px)"
              : "none",
        }}
      >
        <div>
          <div className="row mt-3 align-items-center">
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
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <IoIosSearch
                  style={{ color: "grey" }}
                  size={20}
                  className="ms-2"
                />
              </div>
            </div>
          </div>
          <h6>{totalItems} records</h6>
        </div>
        <div>
          <div className="row bg-white table-list list-heading gap-0 border-bottom">
            <div className="col-auto text-end p-0 d-flex align-items-center">
              <input type="checkbox" className="m-0 p-0 ms-3" />
            </div>
            <div className="col p-0 text-center">Assigned To</div>
            <div className="col p-0 ms-1 text-center">Status</div>
            <div className="col p-0 ms-1 text-center">Due Date</div>
            <div className="col p-0 ms-1 text-center">Priority</div>
            <div className="col p-0 text-center">Comments</div>
            <div className="col-1 p-0 text-center"></div>
          </div>

          {filteredTasks.slice(startItem, endItem).map((cur) => (
            <div
              className="row bg-white table-list gap-0 border-bottom"
              key={cur.id}
            >
              <div className="col-auto text-end p-0 d-flex align-items-center">
                <input type="checkbox" className="m-0 p-0 ms-3" />
              </div>
              <div className="col p-0 text-center">{cur.name}</div>
              <div className="col p-0 ms-1 text-center">{cur.status}</div>
              <div className="col p-0 ms-1 text-center">{cur.due_date}</div>
              <div className="col p-0 ms-1 text-center">{cur.priority}</div>
              <div className="col p-0 text-center">{cur.comments}</div>
              <div className="col-1 p-0 text-center">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id={`dropdown-${cur.id}`}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ maxHeight: "160px", overflowY: "auto" }}
                  >
                    <Dropdown.Item
                      onClick={() => handleEditTask(cur)}
                      className="custom-dropdown-item"
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDeleteTask(cur)}
                      className="custom-dropdown-item"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center">
            {/* <label className="me-2">Items per page:</label> */}
            <Dropdown>
              <Dropdown.Toggle className="no-caret" variant="light">
                {pageSize}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[4, 8, 12, 16].map((size) => (
                  <Dropdown.Item
                    key={size}
                    onClick={() => handlePageSizeChange(size)}
                  >
                    {size}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {totalItems > 0 && (
            <div className="d-flex border border-1">
              <button
                className="btn-light border border-1 p-2"
                onClick={handleFirst}
                disabled={page === 1}
              >
                First
              </button>
              <button
                className="btn-light border border-1 p-2"
                onClick={handlePrevious}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="mt-2 m-2 px-2">{page}</span>
              <button
                className="btn-light border border-1 p-2"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                Next
              </button>
              <button
                className="btn-light border border-1 p-2"
                onClick={handleLast}
                disabled={page === totalPages}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      <AddNewTask
        show={showAddModal}
        onClose={handleCloseModal}
        onAddTask={handleAddTask}
      />
      {/* Edit Task Modal */}
      <EditTask
        show={showEditModal}
        onClose={handleCloseModal}
        task={editTask}
        onUpdateTask={handleUpdateTask}
      />
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "red", color: "white" }}
        >
          <Modal.Title className="text-center w-100 ">Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task "{taskToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="warning" onClick={handleConfirmDeleteTask}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;

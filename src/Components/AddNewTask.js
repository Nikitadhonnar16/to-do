import React, { useState } from "react";
import "../assets/css/AddNewTask.css";

const AddNewTask = ({ show, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), // Simple id generator
      name: taskName,
      status: taskStatus,
      due_date: dueDate,
      priority: priority,
      comments: comments,
    };
    onAddTask(newTask); // Pass the new task back to TaskList
    onClose(); // Close the modal
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div
        className="modal-dialog"
        role="document"
        style={{ maxWidth: "600px" }}
      >
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title mx-auto text-center">New Task</h5>
            <button
              type="button"
              className="btn btn-md close p-0 fs-2"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="taskName" className="form-label">
                    <span className="text-danger">*</span>Assigned To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="taskStatus" className="form-label">
                    <span className="text-danger">*</span> Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskStatus"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="priority" className="form-label">
                    <span className="text-danger">*</span> Priority
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="comments" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    rows="3"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn me-2"
                  onClick={onClose}
                  style={{
                    backgroundColor: "rgb(255, 190, 50)",
                    borderColor: "rgb(255, 190, 50)",
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;

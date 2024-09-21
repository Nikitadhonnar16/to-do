import React, { useState } from "react";

const EditTask = ({ show, onClose, onUpdateTask, initialData }) => {
  const [task, setTask] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(task);
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-hidden={!show}
    >
      <div
        className="modal-dialog"
        role="document"
        style={{ maxWidth: "600px" }}
      >
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title mx-auto text-center">Edit Task</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">
                  Task Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  name="name"
                  value={task.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="taskStatus" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="taskStatus"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="due_date"
                  value={task.due_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="comments" className="form-label">
                  Comments
                </label>
                <textarea
                  className="form-control"
                  id="comments"
                  name="comments"
                  rows="3"
                  value={task.comments}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Update Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;

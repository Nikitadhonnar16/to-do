import React, { useState, useEffect } from "react";

const EditTask = ({ show, onClose, onUpdateTask, initialData }) => {
  const [task, setTask] = useState({
    name: "",
    status: "",
    due_date: "",
    priority: "",
    comments: "",
    ...initialData, // If initialData is provided, it will override the defaults
  });

  useEffect(() => {
    if (initialData) {
      setTask(initialData); // Update task when initialData changes
    }
  }, [initialData]);

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
              className="btn btn-md close p-0 fs-2"
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
                  <span className="text-danger">*</span>Assigned To
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

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="taskStatus" className="form-label">
                    <span className="text-danger">*</span> Status
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
                <div className="col-md-6 mb-3">
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
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="priority" className="form-label">
                    <span className="text-danger">*</span> Priority
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
                <div className="col-md-6 mb-3">
                  <label htmlFor="comments" className="form-label">
                    Comments
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    rows="2"
                    value={task.comments}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-warning me-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success ">
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

export default EditTask;

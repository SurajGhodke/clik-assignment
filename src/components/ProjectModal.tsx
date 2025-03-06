"use client";

import { useState } from "react";

interface Project {
  name: string;
  address: string;
  city: string;
  createdOn: string;
}

interface ProjectModalProps {
  onClose: () => void;
  onAdd: (project: Project) => void;
}

export default function ProjectModal({ onClose, onAdd }: ProjectModalProps) {
  const [project, setProject] = useState<Project>({
    name: "",
    address: "",
    city: "",
    createdOn: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!project.name || !project.address || !project.city) {
      alert("All fields are required!");
      return;
    }
    onAdd(project);
    onClose();
  };

  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Project</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={project.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={project.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={project.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

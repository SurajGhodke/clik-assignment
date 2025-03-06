"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProjectModal from "@/components/ProjectModal";

interface Project {
  name: string;
  address: string;
  city: string;
  createdOn: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, []);

  const addProject = async (newProject: Project) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    const data = await res.json();
    if (data.success) {
      setProjects(data.projects);
    }
  };

  // WITH USESTATE

  //   useEffect(() => {
  //     fetch("/projects.json")
  //       .then((res) => res.json())
  //       .then((data: Project[]) => setProjects(data))
  //       .catch((err) => console.error("Error loading projects:", err))
  //       .finally(() => setLoading(false));
  //   }, []);

  //   const addProject = (newProject: Project) => {
  //     setProjects((prevProjects) => [...prevProjects, newProject]);
  //   };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Project List</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Project
          </button>
        </div>
        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Project Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Created On</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>{project.address}</td>
                  <td>{project.city}</td>
                  <td>{project.createdOn}</td>
                  <td className="text-center">
                    <i
                      className="bi bi-pencil-square text-warning me-2"
                      title="Edit"
                    ></i>
                    <i className="bi bi-trash text-danger" title="Delete"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <ProjectModal onClose={() => setShowModal(false)} onAdd={addProject} />
      )}
    </div>
  );
}

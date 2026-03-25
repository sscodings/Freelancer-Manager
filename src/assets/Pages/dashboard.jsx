import React from "react";
import API from "../../api/axios";
import AddProject from "../Components/Addproject";
import { useState, useEffect } from "react";
import RevenueChart from "../Components/RevenueChart";
import PaymentChart from "../Components/BarChart";
import ProjectStatusChart from "../Components/ProjectStatus";
import TopClientsChart from "../Components/ClientStatus";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/project/all");
      setProjects(res.data.project);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/project/delete/${id}`);
      fetchProjects();
    } catch (err) {
      alert("Error deleting project");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <AddProject onSuccess={fetchProjects} />

      {/* 2x2 Chart Grid */}
      {projects.length > 0 && (
        <div className="px-6 mb-6 grid grid-cols-2 gap-6">
          <RevenueChart projects={projects} />
          <PaymentChart projects={projects} />
          <ProjectStatusChart projects={projects}/>
          <TopClientsChart projects={projects}/>

        </div>
      )}

      {/* Project Cards */}
      <div className="p-6">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex flex-col gap-3 hover:border-green-500 transition-all duration-200 shadow-md hover:shadow-green-500/10"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-white font-semibold text-lg leading-tight">
                    {project.title}
                  </h2>
                  <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Active
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{project.clientName}</span>
                </div>

                {project.description && (
                  <p className="text-zinc-500 text-sm line-clamp-2">{project.description}</p>
                )}

                <div className="mt-auto pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-600 text-xs">
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString()
                      : "No deadline"}
                  </span>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-lg transition-all duration-150"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium">No projects found</p>
            <p className="text-zinc-600 text-sm mt-1">Add a project above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React from "react";
import { useState } from "react";
import API from "../../api/axios";

export default function AddProject() {
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [PaymentStatus, setPaymentStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState("");

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/project/add", { clientName, description, status, PaymentStatus, amount, deadline });
      setClientName("");
      setDescription("");
      setStatus("");
      setPaymentStatus("");
      setAmount(0);
      setDeadline("");
    } catch (err) {
      alert("Error in adding the project");
    }
  };

    // In Addproject.jsx — call this after successful POST
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/project/add", formData);
            props.onSuccess(); // ✅ closes panel + refreshes list
        } catch (err) {
            alert("Error adding project");
        }
    };

  const inputClass = "w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition";
  const labelClass = "text-xs font-medium text-zinc-400";
  const selectClass = "w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition appearance-none cursor-pointer";

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Add Project</h2>
          <p className="text-zinc-500 text-sm mt-1">Fill in the details to create a new project</p>
        </div>

        <form onSubmit={addProject} className="space-y-4">

          {/* Client Name */}
          <div className="space-y-1.5">
            <label className={labelClass}>Client Name</label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className={labelClass}>Description</label>
            <textarea
              placeholder="Brief project description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition resize-none"
            />
          </div>

          {/* Status + Payment Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Project Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>Select status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▾</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Payment Status</label>
              <div className="relative">
                <select
                  value={PaymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>Select payment</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="partial">Partial</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▾</div>
              </div>
            </div>
          </div>

          {/* Amount + Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Amount (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={inputClass + " [color-scheme:dark]"}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98] mt-2"
          >
            Add Project
          </button>

        </form>
      </div>
    </div>
  );
}
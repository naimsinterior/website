
'use client';

import React, { useState } from "react";

const CareerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Integrate API POST request here
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center p-6">
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-foreground">Join Our Team</h1>
        <p className="text-muted-foreground mt-2">
          Explore exciting career opportunities at NAIMS INTERIOR.
        </p>
      </header>

      {/* Job Listings */}
      <section className="w-full max-w-4xl my-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Current Openings</h2>
        <div className="bg-card rounded-lg shadow-md p-4 mb-4">
          <h3 className="text-lg font-bold text-foreground">Interior Designer</h3>
          <p className="text-muted-foreground text-sm mt-1">
            We are looking for a creative and detail-oriented interior designer.
          </p>
          <span className="text-sm text-muted-foreground/80">Location: Chennai, India</span>
        </div>
        <div className="bg-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold text-foreground">Project Coordinator</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Coordinate between clients and the design team to ensure smooth execution.
          </p>
          <span className="text-sm text-muted-foreground/80">Location: Chennai, India</span>
        </div>
      </section>

      {/* Application Form */}
      <section className="w-full max-w-4xl bg-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Apply Now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 bg-background border-border text-foreground"
          >
            <option value="">Select Position</option>
            <option value="Interior Designer">Interior Designer</option>
            <option value="Project Coordinator">Project Coordinator</option>
          </select>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 bg-background border-border text-foreground"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Submit Application
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center text-muted-foreground text-sm mt-6">
        © {new Date().getFullYear()} NAIMS INTERIOR. All rights reserved.
      </footer>
    </div>
  );
};

export default CareerPage;

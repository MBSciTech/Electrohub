import React from "react";

const projects = [
  { title: "Blinking LED", desc: "A beginner project to make an LED blink using Arduino.", link: "#" },
  { title: "Smart Home Automation", desc: "Control your home appliances remotely with NodeMCU.", link: "#" },
  { title: "Line Follower Robot", desc: "Build a robot that follows a line using IR sensors.", link: "#" },
];

const ProjectHighlightsSection = () => (
  <section className="py-5 bg-white" id="projects">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">Project Highlights</h2>
      <div className="row justify-content-center g-4">
        {projects.map((project, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{project.title}</h5>
                <p className="card-text flex-grow-1">{project.desc}</p>
                <a href={project.link} className="btn btn-outline-primary mt-3 align-self-start">View Project</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectHighlightsSection; 
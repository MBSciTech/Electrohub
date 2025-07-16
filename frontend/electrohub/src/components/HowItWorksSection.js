import React from "react";

const steps = [
  { step: 1, title: "Sign Up", desc: "Create your free ElectroHub account." },
  { step: 2, title: "Browse or Upload", desc: "Explore projects or share your own builds." },
  { step: 3, title: "Learn", desc: "Follow interactive tutorials and guides." },
  { step: 4, title: "Track Your Progress", desc: "Save notes and monitor your learning journey." },
];

const HowItWorksSection = () => (
  <section className="py-5 bg-light" id="how-it-works">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">How It Works</h2>
      <div className="row justify-content-center g-4">
        {steps.map((item, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 text-center border-primary border-2">
              <div className="card-body">
                <div className="h2 text-primary mb-2">Step {item.step}</div>
                <h5 className="card-title mb-2">{item.title}</h5>
                <p className="card-text">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection; 
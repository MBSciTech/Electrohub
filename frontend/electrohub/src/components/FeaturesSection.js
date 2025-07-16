import React from "react";

const features = [
  { icon: "🔧", title: "Explore DIY Electronics Projects" },
  { icon: "📘", title: "Learn with Easy-to-Follow Tutorials" },
  { icon: "🌐", title: "Upload & Share Your Own Builds" },
  { icon: "🧠", title: "Save Notes & Resources" },
  { icon: "💬", title: "Join the ElectroHub Community" },
];

const FeaturesSection = () => (
  <section className="py-5 bg-white" id="features">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">Core Features</h2>
      <div className="row justify-content-center g-4">
        {features.map((feature, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body">
                <div className="display-4 mb-3">{feature.icon}</div>
                <h5 className="card-title">{feature.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection; 
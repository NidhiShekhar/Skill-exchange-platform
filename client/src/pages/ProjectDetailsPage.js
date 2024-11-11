import React from "react";
import "./ProjectDetailsPage.css";
import Navbar from "./Navbar";

// Import images
import creativeGraphicDesign from "../assets/creative-graphic-design.jpg";
import marketResearch from "../assets/market-research.jpeg";

function ProjectDetailsPage() {
  return (
    <>
      <Navbar />
      <div className="project-details-container">
        <input
          type="text"
          placeholder="Search Projects..."
          className="search-bar"
        />

        <div className="content">
          <aside className="filters">
            <h3>Filters</h3>
            <section>
              <h4>Categories</h4>
              <label>
                <input type="checkbox" /> Technology
              </label>
              <label>
                <input type="checkbox" /> Business
              </label>
              <label>
                <input type="checkbox" /> Design
              </label>
            </section>
            <section>
              <h4>Skill Level</h4>
              <label>
                <input type="checkbox" /> Beginner
              </label>
              <label>
                <input type="checkbox" /> Intermediate
              </label>
              <label>
                <input type="checkbox" /> Advanced
              </label>
            </section>
            <section>
              <h4>Project Type</h4>
              <label>
                <input type="checkbox" /> Short-term
              </label>
              <label>
                <input type="checkbox" /> Long-term
              </label>
            </section>
            <section>
              <h4>Project Status</h4>
              <label>
                <input type="checkbox" /> Open
              </label>
              <label>
                <input type="checkbox" /> In Progress
              </label>
              <label>
                <input type="checkbox" /> Completed
              </label>
            </section>
          </aside>

          <main className="project-explorer">
            <header className="explore-header">
              <h2>Explore Projects</h2>
              <div className="sort-by">Sort By : Relevance</div>
            </header>

            <div className="project-cards">
              <div className="project-card">
                <img
                  src={creativeGraphicDesign}
                  alt="Creative Graphic Design"
                />
                <h3>Creative Graphic Design</h3>
                <p>
                  Design innovative graphics for promotional materials and
                  online content.
                </p>
                <div className="tags">
                  <span className="tag">Design</span>
                  <span className="tag">Advanced</span>
                  <span className="tag completed">Completed</span>
                </div>
                <button className="view-details-btn">View Details</button>
              </div>

              <div className="project-card">
                <img src={marketResearch} alt="Market Research Analysis" />
                <h3>Market Research Analysis</h3>
                <p>
                  Conduct comprehensive research to identify market trends and
                  opportunities.
                </p>
                <div className="tags">
                  <span className="tag">Business</span>
                  <span className="tag">Beginner</span>
                  <span className="tag in-progress">In Progress</span>
                </div>
                <button className="join-project-btn">Join Project</button>
              </div>
            </div>

            <div className="pagination">
              <button className="pagination-btn">Previous</button>
              <button className="pagination-btn">Next</button>
            </div>
          </main>

          <aside className="featured-projects">
            <h3>Featured Projects</h3>
            <div className="featured-project">
              <p>Blockchain Implementation</p>
              <span className="tag">Technology</span>
            </div>
            <div className="featured-project">
              <p>Digital Marketing Strategy</p>
              <span className="tag">Business</span>
            </div>
            <div className="featured-project">
              <p>3D Animation</p>
              <span className="tag">Design</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default ProjectDetailsPage;

import React from "react";
import Navbar from "./Navbar";
import "./AboutUsPage.css";

// Importing images for the reviews
import user1 from "../assets/mentor1.jpeg";
import user2 from "../assets/mentor2.jpeg";
import user3 from "../assets/mentor3.jpeg";

function AboutUsPage() {
  return (
    <div className="about-us-container">
      <Navbar />

      {/* Mission Section */}
      <div className="info-section left-aligned">
        <div className="info-card">
          <h2>Our Mission</h2>
          <p>
            Empowering individuals by creating opportunities to collaborate,
            learn, and grow together in meaningful projects.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="info-section right-aligned">
        <div className="info-card">
          <h2>How It Works</h2>
          <p>
            Connect, collaborate, and grow with peers by finding and
            contributing to skill-driven projects.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="info-section left-aligned">
        <div className="info-card">
          <h2>Why Choose Us?</h2>
          <p>We provide a platform where creativity meets collaboration.</p>
          <p>
            Build your network, gain hands-on experience, and grow with a
            vibrant community of like-minded individuals.
          </p>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="info-section right-aligned">
        <div className="info-card">
          <h2>What We Offer</h2>
          <p>
            From personalized project matches to mentorship and real-world
            experiences, PESU Skill Exchange is here to guide you every step of
            the way.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Collaboration</h3>
            <p>We believe in the power of teamwork and shared knowledge.</p>
          </div>
          <div className="value-card">
            <h3>Growth</h3>
            <p>Encouraging personal and professional development.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Fostering creativity and a drive for positive change.</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>What Our Mentors Say</h2>
        <div className="review-cards">
          <div className="review-card">
            <img src={user1} alt="John Doe" />
            <h4>John Doe</h4>
            <p>“An incredible platform to work with talented peers!”</p>
          </div>
          <div className="review-card">
            <img src={user2} alt="Jane Smith" />
            <h4>Jane Smith</h4>
            <p>
              “The projects helped students and myself grow professionally!”
            </p>
          </div>
          <div className="review-card">
            <img src={user3} alt="Alex Johnson" />
            <h4>Alex Johnson</h4>
            <p>“A community that values collaboration and innovation.”</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          For any inquiries or to learn more about PESU Skill Exchange, reach
          out to us at{" "}
          <a href="mailto:contact@pesuskill.com">contact@pesuskill.com</a>.
          We’re here to help and look forward to connecting with you!
        </p>
      </section>
    </div>
  );
}

export default AboutUsPage;

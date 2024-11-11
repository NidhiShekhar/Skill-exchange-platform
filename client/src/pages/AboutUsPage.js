import React from "react";
import Navbar from "./Navbar";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="about-us-container">
      <Navbar />

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower individuals by providing a platform where
          they can showcase their skills, contribute to meaningful projects, and
          develop new competencies. We aim to cultivate a community of learners,
          doers, and innovators who are passionate about making an impact.
        </p>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <p>
          PESU Skill Exchange allows users to post projects, list skills, and
          collaborate with others based on shared interests and expertise.
          Whether you’re looking to gain experience, find collaborators, or
          contribute your skills to exciting projects, PESU Skill Exchange
          provides the tools and support to make it happen.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Collaboration:</strong> We believe in the power of teamwork
            and the value of sharing knowledge and skills.
          </li>
          <li>
            <strong>Growth:</strong> We encourage personal and professional
            growth through hands-on experiences and real-world projects.
          </li>
          <li>
            <strong>Innovation:</strong> We foster an environment that
            encourages creativity, problem-solving, and a drive for positive
            change.
          </li>
        </ul>
      </section>

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

import { useState } from "react";

import doctorImage from "./assets/doctor.jpg";
import heroImage from "./assets/hero.png";

import "./App.css";


function App() {

  // =========================
  // NAVBAR STATE
  // =========================

  const [menuOpen, setMenuOpen] = useState(false);


  // =========================
  // CHATBOT STATE
  // =========================

  const [chatOpen, setChatOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello! 👋 I am Dr. Hemraj Saini's virtual assistant. How can I help you?"
    }
  ]);

  const [input, setInput] = useState("");


  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /// =========================
// APPOINTMENT FUNCTION
// =========================

const handleAppointment = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const appointmentData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: null,
    date: formData.get("date"),
    time: formData.get("time"),
    message: formData.get("message")
  };

  console.log("Appointment Data:", appointmentData);

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/appointments",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(appointmentData)
      }
    );

    const data = await response.json();

    console.log("Backend Response:", data);

    if (response.ok && data.success) {
      alert(
        `✅ Appointment booked successfully!\n\nAppointment ID: ${data.appointment_id}`
      );

      e.target.reset();

    } else {
      alert(
        `❌ Appointment submit nahi ho paya.\n\n${
          data.detail || "Something went wrong"
        }`
      );
    }

  } catch (error) {
    console.error("Appointment Error:", error);

    alert(
      "❌ Backend server se connection nahi ho raha.\n\n" +
      "Please make sure FastAPI server is running."
    );
  }
};
  // =========================
  // CHATBOT FUNCTION
  // =========================

  const sendMessage = () => {

    if (!input.trim()) {
      return;
    }


    const userMessage = input.trim();


    // Add user message

    setMessages((prev) => [
      ...prev,

      {
        sender: "user",
        text: userMessage
      }
    ]);


    // Clear input

    setInput("");


    // Default reply

    let reply =
      "For detailed information or medical consultation, please contact Dr. Hemraj Saini directly. 📞";


    const msg = userMessage.toLowerCase();


    // =========================
    // GREETING
    // =========================

    if (
      msg.includes("hello") ||
      msg.includes("hi") ||
      msg.includes("hey") ||
      msg.includes("namaste")
    ) {

      reply =
        "Hello! 👋 Welcome to Dr. Hemraj Saini's website. How can I help you today?";

    }


    // =========================
    // APPOINTMENT
    // =========================

    else if (
      msg.includes("appointment") ||
      msg.includes("book") ||
      msg.includes("booking")
    ) {

      reply =
        "Sure! 😊 You can book an appointment using the appointment form on this website. You can also contact us through WhatsApp.";

    }


    // =========================
    // PHONE
    // =========================

    else if (
      msg.includes("phone") ||
      msg.includes("mobile") ||
      msg.includes("number") ||
      msg.includes("contact")
    ) {

      reply =
        "You can contact Dr. Hemraj Saini at 📞 9870181161.";

    }


    // =========================
    // EMAIL
    // =========================

    else if (
      msg.includes("email") ||
      msg.includes("mail")
    ) {

      reply =
        "You can contact Dr. Hemraj Saini by email at 📧 hemrajgandraliya2004@gmail.com.";

    }


    // =========================
    // WHATSAPP
    // =========================

    else if (
      msg.includes("whatsapp") ||
      msg.includes("whats app")
    ) {

      reply =
        "You can contact us directly on WhatsApp using the WhatsApp button on this website. 💬";

    }


    // =========================
    // SERVICES
    // =========================

    else if (
      msg.includes("service") ||
      msg.includes("services")
    ) {

      reply =
        "Our website provides information about Consultation 🩺, Patient Care ❤️, Health Assessment 📋 and Health Guidance 💙.";

    }


    // =========================
    // CONSULTATION
    // =========================

    else if (
      msg.includes("consultation") ||
      msg.includes("consult")
    ) {

      reply =
        "Professional consultation is available with a patient-focused approach. 🩺";

    }


    // =========================
    // PATIENT CARE
    // =========================

    else if (
      msg.includes("patient care") ||
      msg.includes("care")
    ) {

      reply =
        "Patient care focuses on providing dedicated attention and professional healthcare support. ❤️";

    }


    // =========================
    // HEALTH ASSESSMENT
    // =========================

    else if (
      msg.includes("health assessment") ||
      msg.includes("assessment")
    ) {

      reply =
        "Health assessment information is provided according to individual healthcare requirements. 📋";

    }


    // =========================
    // HEALTH GUIDANCE
    // =========================

    else if (
      msg.includes("health guidance") ||
      msg.includes("guidance")
    ) {

      reply =
        "Health guidance is provided to help patients understand their healthcare needs. 💙";

    }


    // =========================
    // DOCTOR NAME
    // =========================

    else if (
      msg.includes("doctor") ||
      msg.includes("name")
    ) {

      reply =
        "The healthcare professional featured on this website is Dr. Hemraj Saini. 👨‍⚕️";

    }


    // =========================
    // WEBSITE
    // =========================

    else if (
      msg.includes("website") ||
      msg.includes("about website")
    ) {

      reply =
        "This is the official professional website of Dr. Hemraj Saini, providing information about healthcare services, contact details and appointment requests.";

    }


    // =========================
    // THANKS
    // =========================

    else if (
      msg.includes("thank") ||
      msg.includes("thanks")
    ) {

      reply =
        "You're welcome! 😊 If you need anything else, feel free to ask.";

    }


    // =========================
    // BYE
    // =========================

    else if (
      msg.includes("bye") ||
      msg.includes("goodbye")
    ) {

      reply =
        "Goodbye! 👋 Have a great day. Take care!";

    }


    // =========================
    // BOT REPLY
    // =========================

    setTimeout(() => {

      setMessages((prev) => [
        ...prev,

        {
          sender: "bot",
          text: reply
        }
      ]);

    }, 500);

  };


  // =========================
  // RETURN UI
  // =========================

  return (

    <div className="website">


      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div className="logo">
          Dr. Hemraj <span>Saini</span>
        </div>


        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>


        <div
          className={`nav-links ${
            menuOpen ? "show" : ""
          }`}
        >

          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#services" onClick={closeMenu}>
            Services
          </a>

          <a href="#experience" onClick={closeMenu}>
            Experience
          </a>

          <a href="#gallery" onClick={closeMenu}>
            Gallery
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>

        </div>

      </nav>



      {/* =========================
          HERO SECTION
      ========================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO THE OFFICIAL WEBSITE
          </p>


          <h1>
            Dr. Hemraj <span>Saini</span>
          </h1>


          <h2>
            Healthcare Professional
          </h2>


          <p className="hero-text">

            Dedicated to providing professional,
            compassionate and patient-focused
            healthcare services with care and commitment.

          </p>


          <div className="hero-buttons">

            <a
              href="#contact"
              className="btn primary-btn"
            >
              📅 Book Appointment
            </a>


            <a
              href="#about"
              className="btn secondary-btn"
            >
              👨‍⚕️ About Me
            </a>


            <a
              href="https://wa.me/919870181161"
              target="_blank"
              rel="noopener noreferrer"
              className="btn whatsapp-btn"
            >
              💬 WhatsApp
            </a>

          </div>


          <div className="hero-features">

            <div>
              <strong>✓</strong>
              <span>Patient Focused</span>
            </div>


            <div>
              <strong>✓</strong>
              <span>Professional Care</span>
            </div>


            <div>
              <strong>✓</strong>
              <span>Trusted Service</span>
            </div>

          </div>

        </div>



        <div className="hero-card">

          <img
            src={doctorImage}
            alt="Dr. Hemraj Saini"
            className="doctor-image"
          />


          <h3>
            Dr. Hemraj Saini
          </h3>


          <p>
            Healthcare Professional
          </p>

        </div>

      </section>



      {/* =========================
          ABOUT
      ========================= */}

      <section
        className="section about"
        id="about"
      >

        <div className="section-title">

          <p>
            ABOUT ME
          </p>

          <h2>
            Professional & Dedicated
          </h2>

        </div>


        <div className="about-content">

          <div className="about-image">

            <img
              src={doctorImage}
              alt="Dr. Hemraj Saini"
              className="about-doctor-image"
            />

          </div>


          <div className="about-text">

            <h3>
              About Dr. Hemraj Saini
            </h3>


            <p>
              Welcome to the official website
              of Dr. Hemraj Saini.
              This website provides information
              about professional experience,
              services and healthcare-related activities.
            </p>


            <p>
              My goal is to provide quality care
              while maintaining professionalism,
              compassion and trust with every patient.
            </p>


            <div className="info-boxes">

              <div>

                <strong>
                  Professional
                </strong>

                <span>
                  Healthcare Services
                </span>

              </div>


              <div>

                <strong>
                  Approach
                </strong>

                <span>
                  Patient Focused
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =========================
          SERVICES
      ========================= */}

      <section
        className="section services"
        id="services"
      >

        <div className="section-title">

          <p>
            OUR SERVICES
          </p>

          <h2>
            Professional Healthcare Services
          </h2>

          <span>
            Quality-focused healthcare support with a professional and
            patient-centered approach.
          </span>

        </div>


        <div className="services-grid">


          <div className="service-card">

            <div className="service-icon">
              🩺
            </div>

            <h3>
              Consultation
            </h3>

            <p>
              Professional consultation and guidance focused on
              understanding individual healthcare needs.
            </p>

            <a href="#contact">
              Book Consultation →
            </a>

          </div>



          <div className="service-card">

            <div className="service-icon">
              ❤️
            </div>

            <h3>
              Patient Care
            </h3>

            <p>
              Patient-focused care with attention to comfort,
              communication and overall healthcare support.
            </p>

            <a href="#contact">
              Contact Us →
            </a>

          </div>



          <div className="service-card">

            <div className="service-icon">
              📋
            </div>

            <h3>
              Health Assessment
            </h3>

            <p>
              General health assessment and guidance to help
              understand important healthcare concerns.
            </p>

            <a href="#contact">
              Get Assessment →
            </a>

          </div>



          <div className="service-card">

            <div className="service-icon">
              💙
            </div>

            <h3>
              Health Guidance
            </h3>

            <p>
              Helpful healthcare guidance designed to support
              informed and responsible health decisions.
            </p>

            <a href="#contact">
              Get Guidance →
            </a>

          </div>

        </div>

      </section>



      {/* =========================
          GALLERY
      ========================= */}

      <section
        className="section gallery"
        id="gallery"
      >

        <div className="section-title">

          <p>
            PHOTO GALLERY
          </p>

          <h2>
            Professional Moments
          </h2>

        </div>


        <div className="gallery-grid">


          <div className="gallery-card">

            <img
              src={doctorImage}
              alt="Dr. Hemraj Saini"
            />

          </div>



          <div className="gallery-card">

            <img
              src={heroImage}
              alt="Healthcare Professional"
            />

          </div>



          <div className="gallery-card">

            <img
              src={doctorImage}
              alt="Dr. Hemraj Saini Professional"
            />

          </div>

        </div>

      </section>



      {/* =========================
          EXPERIENCE
      ========================= */}

      <section
        className="section experience"
        id="experience"
      >

        <div className="section-title">

          <p>
            MY JOURNEY
          </p>

          <h2>
            Experience & Education
          </h2>

        </div>


        <div className="timeline">


          <div className="timeline-item">

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <span>
                Education
              </span>

              <h3>
                Medical Education
              </h3>

              <p>
                Professional medical education
                and continuous learning in
                the healthcare field.
              </p>

            </div>

          </div>



          <div className="timeline-item">

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <span>
                Experience
              </span>

              <h3>
                Professional Practice
              </h3>

              <p>
                Developing professional experience
                through patient care and healthcare services.
              </p>

            </div>

          </div>


        </div>

      </section>



      {/* =========================
          CONTACT
      ========================= */}

      <section
        className="section contact"
        id="contact"
      >

        <div className="section-title">

          <p>
            GET IN TOUCH
          </p>

          <h2>
            Book an Appointment
          </h2>

        </div>


        <div className="appointment-wrapper">


          <div className="appointment-info">

            <h3>
              Let's Connect
            </h3>


            <p>
              For appointments, enquiries or
              general information, please get
              in touch using the contact details below.
            </p>



            <div className="contact-card">

              <div className="contact-card-icon">
                📧
              </div>

              <div>

                <h3>
                  Email
                </h3>

                <p>
                  hemrajgandraliya2004@gmail.com
                </p>

              </div>

            </div>



            <div className="contact-card">

              <div className="contact-card-icon">
                📞
              </div>

              <div>

                <h3>
                  Phone
                </h3>

                <p>
                  9870181161
                </p>

              </div>

            </div>



            <a
              href="https://wa.me/919870181161"
              target="_blank"
              rel="noopener noreferrer"
              className="appointment-whatsapp"
            >
              💬 Contact on WhatsApp
            </a>

          </div>



          <form
            className="appointment-form"
            onSubmit={handleAppointment}
          >

            <h3>
              Appointment Request
            </h3>


            <label>
              Your Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />


            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
            />


            <label>
              Preferred Date
            </label>

            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              required
            />


            <label>
              Preferred Time
            </label>

            <input
              type="time"
              name="time"
              required
            />


            <label>
              Message
            </label>

            <textarea
              name="message"
              rows="5"
              placeholder="Write your appointment request..."
              required
            ></textarea>


            <button type="submit">
              📲 Request Appointment
            </button>

          </form>

        </div>

      </section>



      {/* ==================================================
          CHATBOT
      ================================================== */}

      <div className="chatbot-container">


        {/* CHAT WINDOW */}

        {chatOpen && (

          <div className="chatbot-window">


            {/* CHAT HEADER */}

            <div className="chatbot-header">

              <div>

                <strong>
                  🤖 Dr. Hemraj Assistant
                </strong>

                <span>
                  🟢 Online
                </span>

              </div>


              <button
                className="chat-close"
                onClick={() => setChatOpen(false)}
                aria-label="Close chatbot"
              >
                ✕
              </button>

            </div>



            {/* CHAT MESSAGES */}

            <div className="chatbot-messages">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`chat-message ${message.sender}`}
                >
                  {message.text}
                </div>

              ))}

            </div>



            {/* CHAT INPUT */}

            <div className="chatbot-input-area">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    sendMessage();
                  }

                }}
                placeholder="Type your message..."
              />


              <button
                onClick={sendMessage}
                aria-label="Send message"
              >
                ➤
              </button>

            </div>

          </div>

        )}



        {/* CHAT BUTTON */}

        <button
          className="chatbot-button"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open chatbot"
        >
          {chatOpen ? "✕" : "💬"}
        </button>

      </div>



      {/* =========================
          FLOATING WHATSAPP
      ========================= */}

      <a
        href="https://wa.me/919870181161"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Contact on WhatsApp"
      >
        💬
      </a>



      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <h3>
          Dr. Hemraj Saini
        </h3>

        <p>
          Professional Healthcare Services
        </p>


        <div className="footer-links">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#experience">
            Experience
          </a>

          <a href="#gallery">
            Gallery
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>


        <p className="copyright">

          © 2026 Dr. Hemraj Saini.
          All Rights Reserved.

        </p>

      </footer>

    </div>

  );

}


export default App;
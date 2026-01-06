import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { TypeAnimation } from 'react-type-animation';
import { motion, useScroll, useSpring } from 'framer-motion';

// ANIMATION VARIANTS
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function App() {
  // 📏 SCROLL PROGRESS BAR LOGIC
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 🖱️ CUSTOM CURSOR LOGIC
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: { x: mousePosition.x - 16, y: mousePosition.y - 16 },
    text: { height: 80, width: 80, x: mousePosition.x - 40, y: mousePosition.y - 40, backgroundColor: "rgb(56, 189, 248)", mixBlendMode: "difference" }
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <div className="position-relative">
      
      {/* 📏 SCROLL PROGRESS BAR (Top of screen) */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '5px', background: '#38bdf8', transformOrigin: '0%', zIndex: 9999 }}
      />

      {/* 🖱️ CUSTOM CURSOR */}
      <motion.div
        className="cursor d-none d-md-block" // Mobile pe chhupa denge
        variants={variants}
        animate={cursorVariant}
        style={{
            position: 'fixed', left: 0, top: 0, width: 32, height: 32, borderRadius: '50%', 
            backgroundColor: 'rgba(56, 189, 248, 0.5)', pointerEvents: 'none', zIndex: 9998,
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
        }}
      />

      {/* 🌌 BACKGROUND GLOW */}
      <div className="background-glow"></div>

      {/* 🧭 NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-glass py-3">
        <div className="container">
          <a onMouseEnter={textEnter} onMouseLeave={textLeave} className="navbar-brand fw-bold fs-4" href="#">
            <i className="bi bi-code-slash text-info me-2"></i>Samarth<span className="text-info">.dev</span>
          </a>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-3">
              {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li className="nav-item" key={item}>
                  <a onMouseEnter={textEnter} onMouseLeave={textLeave} className="nav-link text-white small text-uppercase tracking-wide" href={`#${item.toLowerCase()}`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section id="home" className="d-flex align-items-center min-vh-100 pt-5">
        <div className="container">
          <div className="row align-items-center flex-column-reverse flex-lg-row">
            
            <motion.div 
              className="col-lg-7 text-center text-lg-start mt-5 mt-lg-0"
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            >
              <div className="badge bg-white bg-opacity-10 border border-light rounded-pill px-3 py-2 mb-3 text-info">
                👋 Welcome to my portfolio
              </div>
              <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className="display-3 fw-bold mb-3">
                Hi, I'm <span className="gradient-text">Samarth Tare</span>
              </h1>
              <h2 className="h3 text-muted mb-4">
                I am a{' '}
                <TypeAnimation
                  sequence={['Full Stack Developer 💻', 1000, 'MERN Stack Expert 🍃', 1000, 'Problem Solver 🧩', 1000]}
                  wrapper="span" speed={50} className="text-white fw-bold" repeat={Infinity}
                />
              </h2>
              <p className="lead text-secondary mb-5 w-75 mx-auto mx-lg-0">
                Building scalable web applications with modern technologies. Based in <strong>Harda, MP</strong>.
              </p>
              
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <a onMouseEnter={textEnter} onMouseLeave={textLeave} href="#projects" className="btn btn-info btn-lg fw-bold px-4 rounded-pill shadow-lg">View Work</a>
                
                {/* 📄 RESUME BUTTON ADDED HERE */}
                <a onMouseEnter={textEnter} onMouseLeave={textLeave} href="/resume.pdf" download="Samarth_Tare_Resume" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                    <i className="bi bi-download me-2"></i> Resume
                </a>
              </div>
              
              <div className="d-flex gap-2 mt-4 justify-content-center justify-content-lg-start">
                  <a href="https://github.com/SamarthTare" target="_blank" className="social-btn"><i className="bi bi-github"></i></a>
                  <a href="https://linkedin.com/in/samarthtare" target="_blank" className="social-btn"><i className="bi bi-linkedin"></i></a>
                  <a href="mailto:samarthtare441@gmail.com" className="social-btn"><i className="bi bi-envelope"></i></a>
              </div>

            </motion.div>

            <motion.div 
              className="col-lg-5 text-center"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            >
              <img onMouseEnter={textEnter} onMouseLeave={textLeave} src="/profile.jpg" alt="Samarth" className="hero-img img-fluid" style={{ objectPosition: "top" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 👨‍💻 SKILLS SECTION */}
      <section id="skills" className="py-5">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-5">
            <h6 className="text-info text-uppercase letter-spacing-2">My Arsenal</h6>
            <h2 className="display-5 fw-bold text-white">Technologies I Use</h2>
          </motion.div>
          <div className="row g-4 justify-content-center">
            {["React.js", "Node.js", "Express", "MongoDB", "C++", "DSA", "Bootstrap", "Git", "Docker"].map((skill, index) => (
              <motion.div key={skill} className="col-6 col-md-4 col-lg-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div onMouseEnter={textEnter} onMouseLeave={textLeave} className="glass-card p-3 text-center h-100 d-flex align-items-center justify-content-center">
                  <p className="mb-0 fw-bold">{skill}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📂 PROJECTS SECTION */}
      <section id="projects" className="py-5">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-5">
             <h6 className="text-info text-uppercase">Portfolio</h6>
             <h2 className="display-5 fw-bold text-white">Featured Projects</h2>
          </motion.div>
          <div className="row g-4 justify-content-center">
            
            {/* Project 1 */}
            <div className="col-md-6">
              <motion.div onMouseEnter={textEnter} onMouseLeave={textLeave} className="card glass-card h-100 p-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <i className="bi bi-lightning-charge-fill fs-2 text-warning"></i>
                  <div className="d-flex gap-2">
                    <a href="https://github.com/SamarthTare" className="social-btn" style={{width:35, height:35}}><i className="bi bi-github small"></i></a>
                    <a href="https://image-tools-red.vercel.app" target="_blank" className="btn btn-sm btn-info rounded-pill fw-bold d-flex align-items-center">Live Demo ↗</a>
                  </div>
                </div>
                <h3 className="text-white fw-bold">ImageTools Pro</h3>
                <p className="text-muted small">
                  An all-in-one image processing tool. Convert, Compress, Resize and PDF generation with <strong>Server-side Auto Cleanup</strong> and <strong>Dark Mode</strong>.
                </p>
                <div className="mt-auto d-flex gap-2 flex-wrap">
                  <span className="badge bg-dark border border-secondary text-info">MERN</span>
                  <span className="badge bg-dark border border-secondary text-info">Multer</span>
                  <span className="badge bg-dark border border-secondary text-info">Sharp</span>
                </div>
              </motion.div>
            </div>

            {/* Project 2 */}
            <div className="col-md-6">
              <motion.div onMouseEnter={textEnter} onMouseLeave={textLeave} className="card glass-card h-100 p-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <i className="bi bi-car-front-fill fs-2 text-success"></i>
                  <a href="#" className="social-btn" style={{width:35, height:35}}><i className="bi bi-github small"></i></a>
                </div>
                <h3 className="text-white fw-bold">CleanRide</h3>
                <p className="text-muted small">
                  Vehicle service booking platform. Users can book car/bike washes, track status, and choose service packages. Includes Admin Dashboard.
                </p>
                <div className="mt-auto d-flex gap-2 flex-wrap">
                  <span className="badge bg-dark border border-secondary text-success">React</span>
                  <span className="badge bg-dark border border-secondary text-success">Node.js</span>
                  <span className="badge bg-dark border border-secondary text-success">MongoDB</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 📞 CONTACT SECTION */}
      <section id="contact" className="py-5 text-center mb-5">
        <div className="container">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card p-5 mx-auto" style={{ maxWidth: "700px" }}>
            <h2 onMouseEnter={textEnter} onMouseLeave={textLeave} className="display-5 fw-bold gradient-text mb-4">Let's Work Together</h2>
            <p className="text-muted mb-5">Looking for a Full Stack Developer? Drop me a message or connect on social media.</p>
            <a onMouseEnter={textEnter} onMouseLeave={textLeave} href="mailto:samarthtare441@gmail.com" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-lg">
              <i className="bi bi-envelope-fill me-2"></i> Say Hello
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-4 border-top border-secondary text-muted small">
        <p className="mb-0">© 2026 Samarth Tare. Built with React & Framer Motion.</p>
      </footer>
    </div>
  );
}

export default App;
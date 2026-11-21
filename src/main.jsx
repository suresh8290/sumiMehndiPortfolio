
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Phone,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  Sparkles,
  Heart,
  Flower2,
  ChevronRight,
  Send,
  CheckCircle2,
  HandHeart,
  Star
} from 'lucide-react';
import './style.css';

import feetImg from './assets/feet.webp';
import geometricImg from './assets/geometric.webp';
import radhaImg from './assets/radha.webp';
import arabicImg from './assets/arabic.webp';
import rajasthaniImg from './assets/royal rajasthani.webp';
import freestyleImg from './assets/freestyl.webp';
import karwaImg from './assets/karwa.webp';
import figureImg from './assets/figure.webp';
import weddingImg from './assets/wedding.webp';

const categories = [
  {
    name: 'Feet Mehndi',
    tag: 'Bridal details',
    desc: 'Intricate patterns that bring every detail together.',
    art: 'feet',
    image: feetImg,
    symbol: '✿'
  },
  {
    name: 'Geometric',
    tag: 'Modern artistry',
    desc: 'Clean symmetry, fine lines and contemporary forms.',
    art: 'geo',
    image: geometricImg,
    symbol: '◇'
  },
  {
    name: 'Radha Krishna',
    tag: 'Devotional motifs',
    desc: 'Meaningful storytelling inspired by timeless traditions.',
    art: 'radha',
    image: radhaImg,
    symbol: '❀'
  },
  {
    name: 'Arabic Bridal',
    tag: 'Flowing florals',
    desc: 'Graceful trails, bold florals and elegant negative space.',
    art: 'arabic',
    image: arabicImg,
    symbol: '❋'
  },
  {
    name: 'Royal Rajasthani',
    tag: 'Heritage style',
    desc: 'Peacocks, paisleys and regal Rajasthani detailing.',
    art: 'rajasthani',
    image: rajasthaniImg,
    symbol: '✧'
  },
  {
    name: 'freeStyle',
    tag: 'Personalized',
    desc: 'Custom designs for a beautiful new beginning.',
    art: 'freestyle',
    image: freestyleImg,
    symbol: '♡'
  },
  {
    name: 'Karwa Chauth',
    tag: 'Celebrations',
    desc: 'Heartfelt motifs celebrating the occasion.',
    art: 'karwa-chauth',
    image: karwaImg,
    symbol: '❦'
  },
  {
    name: 'Figure Mehndi',
    tag: 'Fine illustration',
    desc: 'Expressive portraits and story-led compositions.',
    art: 'figure',
    image: figureImg,
    symbol: '✿'
  },
  {
    name: 'Wedding Mehndi',
    tag: 'The bridal classic',
    desc: 'Personalized bridal art made for your special day.',
    art: 'wedding',
    image: weddingImg,
    symbol: '♛'
  }
];

const filters = [
  'All designs',
  'Bridal',
  'Traditional',
  'Modern',
  'Celebrations'
];

const group = (name) =>
  name.includes('Wedding') ||
    name.includes('Bridal') ||
    name.includes('Feet') ||
    name.includes('Rajasthani')
    ? 'Bridal'
    : name.includes('Karwa')
      ? 'Celebrations'
      : name.includes('Geometric')
        ? 'Modern'
        : 'Traditional';

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All designs');
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event: 'Bridal / Wedding',
    date: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const visible = useMemo(
    () =>
      categories.filter(
        (item) =>
          filter === 'All designs' || group(item.name) === filter
      ),
    [filter]
  );

  const closeMenu = () => setMenuOpen(false);

  const submit = async (e) => {
    e.preventDefault();

    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!service || !template || !key) {
      alert(
        'EmailJS is not configured yet. Add your Service ID, Template ID and Public Key in the .env file.'
      );
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        service,
        template,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          event_type: form.event,
          event_date: form.date || 'Not decided',
          message: form.message,
          to_name: 'Sumitra Sahu'
        },
        key
      );

      setSent(true);

      setForm({
        name: '',
        email: '',
        phone: '',
        event: 'Bridal / Wedding',
        date: '',
        message: ''
      });
    } catch (err) {
      console.error('EmailJS error:', err);
      alert(
        'Message could not be sent. Please try WhatsApp or call instead.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={dark ? 'app dark' : 'app'}>

      {/* HEADER */}
      <header className="topbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-mark">S</span>
          <span>
            <b>Sumi</b>
            <small>MEHNDI ARTS</small>
          </span>
        </a>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a className="nav-book" href="#contact">
            Book an appointment <ArrowUpRight size={15} />
          </a>

          <button
            className="icon-btn mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="eyebrow"
            >
              <span />
              ARTISTRY ROOTED IN TRADITION
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Every hand tells
              <br />
              a <em>beautiful story.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Thoughtful, detailed mehndi artistry for weddings,
              celebrations and the moments you want to remember forever.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <a className="btn-primary" href="#gallery">
                Explore my designs <ArrowUpRight size={17} />
              </a>

              <a className="btn-text" href="#about">
                Meet the artist <ChevronRight size={16} />
              </a>
            </motion.div>

            <motion.div
              className="hero-proof"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <div className="proof-icon">
                <Flower2 size={20} />
              </div>

              <div>
                <b>5 years of experience</b>
                <span>Made with patience, passion & detail</span>
              </div>

              <div className="proof-stars">
                <Star /><Star /><Star /><Star /><Star />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="hero-image-wrap">
              <img
                src={weddingImg}
                alt="Wedding mehndi design"
                className="hero-main-image"
              />

              <div className="hero-image-overlay">
                <span className="image-kicker">THE BRIDAL EDIT</span>
                <span className="image-caption">
                  Tradition, drawn by hand.
                </span>
              </div>
            </div>

            <motion.div
              className="floating-note"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <span className="note-icon">
                <Heart size={16} />
              </span>
              <span>
                <b>Made just for you</b>
                <small>Personalized designs</small>
              </span>
            </motion.div>

            <div className="hero-seal">S<span>✧</span>A</div>
          </motion.div>

          <div className="hero-bottom">
            <span>BHILWARA · RAJASTHAN</span>
            <span>SCROLL TO DISCOVER ↓</span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="intro section" id="about">
          <div className="section-kicker">A LITTLE ABOUT ME</div>

          <div className="intro-grid">
            <motion.h2
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Hi, I'm <em>Sumitra.</em>
              <br />
              Your mehndi artist.
            </motion.h2>

            <motion.div
              className="intro-copy"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="lead">
                I believe mehndi is more than an art — it's a memory,
                a celebration and a little piece of tradition.
              </p>

              <p>
                With 5 years of experience, I create designs for every
                kind of occasion and every kind of personality. From
                delicate Arabic patterns to detailed bridal stories,
                each design is made with care and a love for the craft.
              </p>

              <a className="under-link" href="#contact">
                Let's create something beautiful
                <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </div>

          <div className="stats">
            <div><b>05<span>+</span></b><small>Years of experience</small></div>
            <div><b>09</b><small>Featured art styles</small></div>
            <div><b>∞</b><small>Ways to personalize</small></div>
            <div><b>01</b><small>Artist, your vision</small></div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery-section section" id="gallery">
          <div className="section-head">
            <div>
              <div className="section-kicker">THE ART COLLECTION</div>
              <h2>Find your <em>style.</em></h2>
              <p>
                Every design has its own character.
                Explore the styles I love creating.
              </p>
            </div>

            <span className="gallery-count">
              01 — 09 / COLLECTION
            </span>
          </div>

          <div className="filters">
            {filters.map((f) => (
              <button
                key={f}
                className={filter === f ? 'filter active' : 'filter'}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <motion.button
                  layout
                  key={item.name}
                  className={`gallery-card art-${item.art}`}
                  onClick={() => setSelected(item)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ y: -7 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.045,
                    ease: 'easeOut'
                  }}
                >
                  <div className="gallery-visual">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="gallery-image"
                      loading="lazy"
                      whileHover={{ scale: 1.035 }}
                      transition={{ duration: 0.55 }}
                    />

                    <span className="visual-label">{item.tag}</span>

                    <span className="visual-number">
                      0{categories.indexOf(item) + 1}
                    </span>

                    <span className="view-art">
                      View design <ArrowUpRight size={15} />
                    </span>
                  </div>

                  <div className="gallery-card-foot">
                    <span>{item.name}</span>
                    <ArrowUpRight size={17} />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="gallery-note">
            <Sparkles size={15} />
            Every design is created with care and attention to detail.
          </p>
        </section>

        {/* SERVICES */}
        <section className="services section" id="services">
          <div className="section-kicker">WHAT I CREATE</div>

          <div className="services-head">
            <h2>
              For every occasion,
              <br />
              <em>a design to remember.</em>
            </h2>

            <p>
              From the first celebration to the wedding day,
              I make mehndi art that feels personal to you.
            </p>
          </div>

          <div className="service-list">
            <motion.div whileHover={{ y: -7 }}>
              <span>01</span>
              <HandHeart />
              <b>Bridal & Wedding</b>
              <p>
                Personalized bridal designs, groom motifs and
                full-hand detailing.
              </p>
              <ArrowUpRight />
            </motion.div>

            <motion.div whileHover={{ y: -7 }}>
              <span>02</span>
              <Flower2 />
              <b>Festive & Traditional</b>
              <p>
                Godh Bharai, family functions, festivals and
                cultural celebrations.
              </p>
              <ArrowUpRight />
            </motion.div>

            <motion.div whileHover={{ y: -7 }}>
              <span>03</span>
              <Sparkles />
              <b>Arabic & Modern</b>
              <p>
                Minimal, geometric, flowing and contemporary
                mehndi styles.
              </p>
              <ArrowUpRight />
            </motion.div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="quote-band">
          <span className="quote-mark">“</span>

          <p>
            Not just patterns on your hands.
            <br />
            <em>Memories you carry with you.</em>
          </p>

          <span className="quote-credit">— SUMI MEHNDI ARTS</span>
        </section>

        {/* CONTACT */}
        <section className="contact section" id="contact">
          <div className="contact-info">
            <div className="section-kicker">LET'S TALK DETAILS</div>

            <h2>
              Have a date
              <br />
              in <em>mind?</em>
            </h2>

            <p>
              Tell me about your occasion and the kind of design you love.
              I'd be happy to create something special for you.
            </p>

            <a href="tel:9785827205" className="contact-line">
              <span><Phone /></span>
              <div>
                <small>CALL / WHATSAPP</small>
                <b>+91 97858 27205</b>
              </div>
              <ArrowUpRight />
            </a>

            <a
              href="https://www.instagram.com/Sumi_Mehndi_Arts/"
              target="_blank"
              rel="noreferrer"
              className="contact-line"
            >
              <span><Instagram /></span>
              <div>
                <small>FOLLOW MY WORK</small>
                <b>@Sumi_Mehndi_Arts</b>
              </div>
              <ArrowUpRight />
            </a>

            <div className="contact-line">
              <span><MapPin /></span>
              <div>
                <small>BASED IN</small>
                <b>Gayatri Nagar, Bhilwara, Rajasthan</b>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            <div className="form-heading">
              <h3>Book an appointment</h3>
              <p>Share a few details and I'll get back to you.</p>
            </div>

            {sent ? (
              <motion.div
                className="success-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 size={38} />
                <h3>Thank you!</h3>
                <p>
                  Your enquiry has been sent. I'll be in touch soon.
                </p>
                <button
                  className="btn-text"
                  onClick={() => setSent(false)}
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Enter your name"
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Phone number
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Your contact number"
                    />
                  </label>

                  <label>
                    Occasion
                    <select
                      value={form.event}
                      onChange={(e) =>
                        setForm({ ...form, event: e.target.value })
                      }
                    >
                      <option value="Bridal / Wedding">Bridal / Wedding</option>
                      <option value="Royal Rajasthani">Royal Rajasthani</option>
                      <option value="Arabic Mehndi">Arabic Mehndi</option>
                      <option value="Freestyle Mehndi">Freestyle Mehndi</option>
                      <option value="Karwa Chauth">Karwa Chauth</option>
                      <option value="Godh Bharai / Baby Shower">Godh Bharai / Baby Shower</option>

                      <option value="Feet Mehndi">Feet Mehndi</option>

                      <option value="Geometric Mehndi">Geometric Mehndi</option>
                      <option value="Figure Mehndi">Figure Mehndi</option>
                      <option value="Festival / Traditional">Festival / Traditional</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Other Celebration">Other Celebration</option>
                    </select>
                  </label>
                </div>

                <label className="date-field">
                  Event date
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                  />
                </label>

                <label>
                  Tell me what you have in mind
                  <textarea
                    rows="4"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Your preferred style, event location, or any design ideas..."
                  />
                </label>

                <button
                  className="btn-primary submit-btn"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send enquiry'}
                  <Send size={16} />
                </button>

                <small className="form-privacy">
                  Your details will only be used to respond to your enquiry.
                </small>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-mark">S</span>
          <span>
            <b>Sumi</b>
            <small>MEHNDI ARTS</small>
          </span>
        </a>

        <p>Art that celebrates your moments.</p>

        <div className="footer-links">
          <a
            href="https://www.instagram.com/Sumi_Mehndi_Arts/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} /> Instagram
          </a>

          <a href="tel:9785827205">
            <Phone size={16} /> Call
          </a>
        </div>

        <small>
          © {new Date().getFullYear()} Sumi Mehndi Arts · Sumitra Sahu
        </small>
      </footer>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close image"
              >
                <X />
              </button>

              <div className="modal-art">
                <img src={selected.image} alt={selected.name} />
                <small>{selected.tag}</small>
              </div>

              <div className="modal-copy">
                <div className="section-kicker">DESIGN CATEGORY</div>
                <h3>{selected.name}</h3>
                <p>{selected.desc}</p>

                <a
                  className="btn-primary"
                  href="#contact"
                  onClick={() => setSelected(null)}
                >
                  Enquire about this style
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

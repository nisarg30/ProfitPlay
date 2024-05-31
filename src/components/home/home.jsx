import React from 'react';
import './home.css'; // CSS file for styling
import { useNavigate } from 'react-router-dom';

function Home() {

  const history = useNavigate();

  const redirect = () => {
    history('/login');
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="title">Welcome to Cyborg0</h1>
          <p className="subtitle">Your Gateway to Simulated Stock Trading</p>
          <div className="buttons-container">
            <button className="btn">Getting Started</button>
            <button className="btn" onClick={redirect}>Login</button>
            <button className="btn">Contact Us</button>
          </div>
        </div>
      </header>

      <section className="about-section">
        <div className="about-content">
          <h2>About Cyborg0</h2>
          <p>
            Cyborg0 is an advanced stock trading simulator designed specifically for the NSE (National Stock Exchange)
            stocks in India. With our platform, you can simulate trading strategies, test your skills, and learn the
            ins and outs of stock trading without risking real money.
          </p>
          <div className="image-container">
            <img src="about-image.jpg" alt="About Cyborg0" className="section-image" />
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-content">
          <h2>Key Features</h2>
          <ul>
            <li>Real-time stock data</li>
            <li>Virtual portfolio management</li>
            <li>Advanced charting tools</li>
            <li>Simulation of trading strategies</li>
            <li>Comprehensive stock analysis</li>
          </ul>
          <div className="image-container">
            <img src="features-image.jpg" alt="Key Features" className="section-image" />
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-content">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <p>"Cyborg0 helped me understand the stock market better and improve my trading skills."</p>
            <p className="author">- John Doe</p>
          </div>
          <div className="testimonial">
            <p>"I love the intuitive interface and powerful features of Cyborg0. Highly recommended!"</p>
            <p className="author">- Jane Smith</p>
          </div>
          <div className="image-container">
            <img src="testimonial-image.jpg" alt="Testimonials" className="section-image" />
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to reach out to us.</p>
          <button className="btn contact-btn">Contact Now</button>
          <div className="image-container">
            <img src="contact-image.jpg" alt="Contact Us" className="section-image" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Cyborg0. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

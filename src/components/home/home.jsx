import React from 'react';
import './home.css'; // CSS file for styling
import { useNavigate } from 'react-router-dom';

const Homey = () => {

  const history = useNavigate();

  const redirectToLogin = () => {
    history('/login');
  }

  const redirectToSignup = () => {
    history('/signup');
  }

  return (
    <div className="homepage">
      <div className="header">
        <img src="./download.png" alt="LOGO" className="logos" />
        <p>ProfitPlay</p>
        <nav>
          <button onClick={() => history('/')}>Home</button>
          <button onClick={() => history('/about')}>About</button>
          <button onClick={() => history('/features')}>Features</button>
          <button onClick={() => history('/contact')}>Contact</button>
          <button onClick={redirectToLogin}>Sign In</button>
          <button onClick={redirectToSignup}>Sign Up</button>
        </nav>
      </div>

      <div className="intro-section" style={{ display : 'flex' }}>
        <div>
          <h2>Welcome to ProfitPlay</h2>
          <p>ProfitPlay is the ultimate stock trading simulator where you can learn and master trading skills without any financial risk.</p>
        </div>
        <img src="/project2.jpg" alt="Stock Trading Simulator" className="intro-image" style={{ marginLeft : 'auto' }}/>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="feature">
          <h3>Real-Time Market Data</h3>
          <p>Get access to real-time market data to simulate trades with live prices.</p>
        </div>
        <div className="feature">
          <h3>Practice Trading</h3>
          <p>Practice your trading strategies in a risk-free environment.</p>
        </div>
        <div className="feature">
          <h3>Comprehensive Analytics</h3>
          <p>Analyze your trading performance with detailed reports and analytics.</p>
        </div>
        <div className="feature">
          <h3>Community and Forums</h3>
          <p>Join our community to discuss strategies and share insights with other traders.</p>
        </div>
        <div className="feature">
          <h3>Educational Resources</h3>
          <p>Access a wide range of educational resources to improve your trading skills.</p>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: support@profitplay.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Finance Street, Money City, Wealth Country</p>
      </div>
    </div>
  );
}

export default Homey;

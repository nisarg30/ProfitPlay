import React, { useRef } from 'react';
import './home.css'; // CSS file for styling
import { useNavigate } from 'react-router-dom';

const Homey = () => {
  const history = useNavigate();
  const featuresRef = useRef(null);
  const contactRef = useRef(null);

  const redirectToLogin = () => {
    history('/login');
  }

  const redirectToSignup = () => {
    history('/signup');
  }

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="homepage">
      <div className="header">
        <img src="./download.png" alt="LOGO" className="logos" />
        <p>ProfitPlay</p>
        <nav>
          <button onClick={() => history('/')}>Home</button>
          <button onClick={scrollToFeatures}>Features</button>
          <button onClick={scrollToContact}>Contact</button>
          <button onClick={redirectToLogin}>Sign In</button>
        </nav>
      </div>

      <div className="intro-section" style={{ display: 'flex' }}>
        <div>
          <h1>ProfitPlay</h1>
          <p>ProfitPlay is the ultimate stock trading simulator where you can learn and master trading skills without any financial risk.</p>
          <ul>
            <li>All the stocks from NSE is available for Trading</li>
            <li>Platform to Learn and apply new knowledge without any risk of losing your money</li>
            <li>Free to use</li>
            <li>Real time Market simulation</li>
          </ul>
        </div>
        <img src="/project2.jpg" alt="Stock Trading Simulator" className="intro-image" style={{ marginLeft: 'auto' }} />
      </div>

      <div className="features-section" ref={featuresRef}>
        <h2>Features</h2>
        <div className="feature alternate">
          <img src="/order.png" alt="Real-Time Market Data" className="feature-image" style={{ width: '100%', maxWidth: '37.5rem', height:'auto'}}/>
          <div className="feature-content">
            <h3>Real-Time Market Data</h3>
            <p>Get access to real-time market data to simulate trades with live prices. All the trades are executed in a similar manner as real-time markets, giving you a realistic experience of stock trading. This feature ensures that you can practice your trading strategies under current market conditions, enhancing your ability to make quick and informed decisions. The real-time data helps in tracking market trends, analyzing stock movements, and developing effective trading strategies.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-content">
            <h3>Practice Trading</h3>
            <p>Practice your trading strategies in a risk-free environment. Test your skills and improve without any financial risk. This feature provides a virtual platform where you can simulate trading scenarios and experiment with different strategies. You can learn from your mistakes without the fear of losing money, making it an ideal tool for beginners and experienced traders alike. The practice environment mimics real market conditions, allowing you to gain confidence and proficiency in trading.</p>
          </div>
          <img src="/order.png" alt="Real-Time Market Data" className="feature-image" style={{ width: '100%', maxWidth: '37.5rem', height:'auto'}}/>
        </div>
        <div className="feature alternate">
        <img src="/portfolio.png" alt="Real-Time Market Data" className="feature-image" style={{ width: '100%', maxWidth: '37.5rem', height:'auto'}}/>
          <div className="feature-content">
            <h3>Portfolio</h3>
            <p>Maintain and track your portfolio. Monitor your performance and make informed decisions. The portfolio feature helps you to keep a detailed record of all your trades, track your investments, and analyze your trading performance. You can view your gains and losses, assess the performance of individual stocks, and make adjustments to your portfolio as needed. This comprehensive tracking system is essential for developing effective investment strategies and achieving long-term financial goals.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-content">
            <h3>Advanced Real-time Charts</h3>
            <p>Analyze your trading performance with detailed reports and analytics. Use advanced charts to make better trading decisions. This feature offers a range of charting tools and technical indicators that help you to visualize market trends and patterns. You can customize the charts to suit your trading style and use them to perform in-depth technical analysis. The detailed reports provide insights into your trading habits, helping you to refine your strategies and improve your overall performance.</p>
          </div>
          <img src="/cha.png" alt="Real-Time Market Data" className="feature-image" style={{ width: '100%', maxWidth: '37.5rem', height:'auto'}}/>
        </div>
        <div className="feature alternate">
          {/* <img src="/order.png" alt="Real-Time Market Data" className="feature-image" style={{ width: '100%', maxWidth: '37.5rem', height:'auto'}}/> */}
          <div className="feature-content">
            <h3>Intraday Trading and Market/Limit Trades</h3>
            <p>Access a wide range of trading options including intraday and limit trades to practice various trading strategies. This feature allows you to engage in short-term trading strategies, taking advantage of intraday price movements. You can set market orders to buy or sell at the current price, or limit orders to trade at a specific price. This flexibility helps you to implement different trading strategies, manage your risks effectively, and take advantage of market opportunities as they arise.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-content">
            <h3>Comprehensive Profit and Loss Analysis</h3>
            <p>Get detailed analysis of your profit and loss. Understand your trading performance and improve your strategies. This feature provides in-depth reports on your trading activities, showing your profits, losses, and overall performance. You can analyze the data to identify patterns, evaluate the effectiveness of your strategies, and make informed decisions to enhance your trading outcomes. The comprehensive analysis helps you to understand your strengths and weaknesses, and to develop a more disciplined and profitable trading approach.</p>
          </div>
          <img src="/acc.png" alt="Real-Time Market Data" className="feature-image" style={{ width: '100%', maxWidth: '37.5rem', height:'auto'}}/>
        </div>
      </div>

      <div className="contact-section" ref={contactRef}>
        <h2>Contact Us</h2>
        <p>Email: support@profitplay.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Finance Street, Money City, Wealth Country</p>
      </div>
    </div>
  );
}

export default Homey;

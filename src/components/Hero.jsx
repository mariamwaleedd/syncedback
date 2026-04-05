import React from 'react';
import { 
  Eye, Users, FileCode, Zap, Activity, 
  TrendingUp, CheckCircle, Smartphone, Monitor, Tablet 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import './Hero.css';

const chartData = [
  { name: 'Mon', value: 30 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 35 },
  { name: 'Thu', value: 60 },
  { name: 'Fri', value: 40 },
  { name: 'Sat', value: 85 },
  { name: 'Sun', value: 65 },
];

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-stats-grid">
        <div className="hero-stat-card">
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box blue"><Eye size={20} /></div>
            <TrendingUp size={16} className="hero-trend-up" />
          </div>
          <h2>48.2K</h2>
          <p>Total Page Views</p>
          <span className="hero-stat-change hero-positive">+12.5% <small>vs last week</small></span>
        </div>

        <div className="hero-stat-card">
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-purple"><Users size={20} /></div>
            <TrendingUp size={16} className="hero-trend-up" />
          </div>
          <h2>3,847</h2>
          <p>Active Users</p>
          <span className="hero-stat-change hero-positive">+8.2% <small>vs last week</small></span>
        </div>

        <div className="hero-stat-card">
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-green"><FileCode size={20} /></div>
            <CheckCircle size={16} className="hero-trend-check" />
          </div>
          <h2>54</h2>
          <p>Total Pages</p>
          <span className="hero-stat-change active">All Active <small>No errors</small></span>
        </div>

        <div className="hero-stat-card">
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-orange"><Zap size={20} /></div>
            <TrendingUp size={16} className="hero-trend-up" />
          </div>
          <h2>23</h2>
          <p>Active Features</p>
          <span className="hero-stat-change active">100% <small>Operational</small></span>
        </div>

        <div className="hero-stat-card">
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-cyan"><Activity size={20} /></div>
            <Activity size={16} className="hero-trend-pulse" />
          </div>
          <h2>99.9%</h2>
          <p>Uptime</p>
          <span className="hero-stat-change active">Healthy <small>All systems</small></span>
        </div>
      </div>

      <div className="hero-main-dashboard-grid">
        <div className="hero-chart-section">
          <div className="hero-section-header">
            <div>
              <h3>Traffic Analytics</h3>
              <p>Page views over time</p>
            </div>
            <div className="hero-filter-tabs">
              <button>24h</button>
              <button className="active">7 Days</button>
              <button>30 Days</button>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#2B7FFF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2B7FFF" 
                  strokeWidth={3} 
                  dot={false} 
                  activeDot={{ r: 6, fill: '#2B7FFF' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="hero-device-distribution">
            <h3>Device Distribution</h3>
            <div className="hero-device-grid">
              <div className="hero-device-item">
                <Smartphone size={24} className="hero-device-icon" />
                <h4>68%</h4>
                <p>Mobile</p>
              </div>
              <div className="hero-device-item">
                <Monitor size={24} className="hero-device-icon" />
                <h4>24%</h4>
                <p>Desktop</p>
              </div>
              <div className="hero-device-item">
                <Tablet size={24} className="hero-device-icon" />
                <h4>8%</h4>
                <p>Tablet</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-activity-section">
          <h3>Recent Activity</h3>
          <div className="hero-activity-list">
            {[
              { icon: <FileCode />, title: 'Page Updated', sub: 'Family Dashboard', time: '5 min ago', type: 'Admin' },
              { icon: <Activity />, title: 'Feature Enabled', sub: 'AI Assistant', time: '23 min ago', type: 'System' },
              { icon: <Zap />, title: 'New Page Created', sub: 'Upload Report', time: '1 hour ago', type: 'Admin' },
              { icon: <FileCode />, title: 'Settings Modified', sub: 'Notification System', time: '2 hours ago', type: 'Admin' },
              { icon: <Activity />, title: 'Database Backup', sub: 'Full Backup', time: '3 hours ago', type: 'System' },
            ].map((item, i) => (
              <div key={i} className="hero-activity-item">
                <div className="hero-activity-icon">{item.icon}</div>
                <div className="activity-content">
                  <div className="activity-row">
                    <span className="hero-activity-title">{item.title}</span>
                  </div>
                  <span className="hero-activity-sub">{item.sub}</span>
                  <div className="hero-activity-meta">
                    {item.type} • {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
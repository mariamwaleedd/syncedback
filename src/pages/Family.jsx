import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Heart, Activity, 
  MapPin, Phone, Mail, Calendar, MoreVertical 
} from 'lucide-react';
import './Family.css';

const familyData = [
  { id: 1, name: 'Mona', role: 'Mother', age: 42, score: '92%', emoji: '😊', emotion: 'Happy', status: 'Healthy', phone: '+123 456 789', email: 'mona@family.com', location: 'Home' },
  { id: 2, name: 'Ahmed', role: 'Father', age: 45, score: '85%', emoji: '👨', emotion: 'Focused', status: 'Active', phone: '+123 456 790', email: 'ahmed@family.com', location: 'Office' },
  { id: 3, name: 'Maya', role: 'Daughter', age: 16, score: '98%', emoji: '😁', emotion: 'Energetic', status: 'Healthy', phone: '+123 456 791', email: 'maya@family.com', location: 'School' },
  { id: 4, name: 'Omar', role: 'Son', age: 12, score: '95%', emoji: '👦', emotion: 'Playful', status: 'Healthy', phone: '+123 456 792', email: 'omar@family.com', location: 'Home' },
  { id: 5, name: 'Grandpa', role: 'Grandfather', age: 72, score: '78%', emoji: '👴', emotion: 'Calm', status: 'Checkup Due', phone: '+123 456 793', email: 'grandpa@family.com', location: 'Home' },
  { id: 6, name: 'Grandma', role: 'Grandmother', age: 68, score: '88%', emoji: '👵', emotion: 'Peaceful', status: 'Healthy', phone: '+123 456 794', email: 'grandma@family.com', location: 'Home' },
  { id: 7, name: 'Aunt Sara', role: 'Aunt', age: 38, score: '91%', emoji: '👩', emotion: 'Busy', status: 'Active', phone: '+123 456 795', email: 'sara@family.com', location: 'Studio' },
  { id: 8, name: 'Uncle Sam', role: 'Uncle', age: 40, score: '82%', emoji: '👨', emotion: 'Tired', status: 'Resting', phone: '+123 456 796', email: 'sam@family.com', location: 'Home' },
  { id: 9, name: 'Cousin Lili', role: 'Cousin', age: 14, score: '94%', emoji: '👧', emotion: 'Excited', status: 'Healthy', phone: '+123 456 797', email: 'lili@family.com', location: 'Gym' },
  { id: 10, name: 'Cousin Leo', role: 'Cousin', age: 10, score: '96%', emoji: '👦', emotion: 'Quiet', status: 'Healthy', phone: '+123 456 798', email: 'leo@family.com', location: 'Home' },
];

const Family = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = familyData.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`family-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <header className="family-page-header">
        <div className="family-header-left">
          <button className="family-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="family-page-titles">
            <h1>Family Members</h1>
            <p>Managing health profiles and connectivity</p>
          </div>
        </div>
        <div className="family-header-actions">
          <div className="family-search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search member name or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="family-stats-banner">
        <div className="family-stat-card">
          <span>Active Profiles</span>
          <h2>{familyData.length}</h2>
        </div>
        <div className="family-stat-card">
          <span>Average Score</span>
          <h2>89%</h2>
        </div>
        <div className="family-stat-card">
          <span>Last Sync</span>
          <h2>2m ago</h2>
        </div>
      </div>

      <main className="family-members-grid">
        {filteredMembers.map(member => (
          <div key={member.id} className="family-profile-card">
            <div className="family-card-header">
              <div className="family-avatar-box">
                <span className="family-emoji">{member.emoji}</span>
                <span className={`family-status-indicator ${member.status.toLowerCase().replace(' ', '-')}`}></span>
              </div>
              <button className="family-more-btn">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="family-card-body">
              <div className="family-name-role">
                <h3>{member.name}</h3>
                <span className="family-role-badge">{member.role}</span>
              </div>
              
              <div className="family-health-insight">
                <div className="family-insight-item">
                  <Heart size={14} className="heart-icon" />
                  <span>{member.score} Score</span>
                </div>
                <div className="family-insight-item">
                  <Activity size={14} className="activity-icon" />
                  <span>{member.emotion}</span>
                </div>
              </div>

              <div className="family-contact-brief">
                <div className="contact-item">
                  <Phone size={14} />
                  <span>{member.phone}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={14} />
                  <span>{member.location}</span>
                </div>
              </div>
            </div>

            <div className="family-card-footer">
              <button className="family-profile-btn">View Full Profile</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Family;

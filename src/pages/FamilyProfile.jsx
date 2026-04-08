import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Activity, Phone, Mail, 
  MapPin, Calendar, Shield, Award, Droplets,
  Thermometer, Wind, AlertCircle
} from 'lucide-react';
import './FamilyProfile.css';

const familyData = [
  { id: 1, name: 'Mona', role: 'Mother', age: 42, score: '92%', emoji: '😊', emotion: 'Happy', status: 'Healthy', phone: '+123 456 789', email: 'mona@family.com', location: 'Home', bloodType: 'A+', weight: '62 kg', height: '165 cm' },
  { id: 2, name: 'Ahmed', role: 'Father', age: 45, score: '85%', emoji: '👨', emotion: 'Focused', status: 'Active', phone: '+123 456 790', email: 'ahmed@family.com', location: 'Office', bloodType: 'O-', weight: '85 kg', height: '182 cm' },
  { id: 3, name: 'Maya', role: 'Daughter', age: 16, score: '98%', emoji: '😁', emotion: 'Energetic', status: 'Healthy', phone: '+123 456 791', email: 'maya@family.com', location: 'School', bloodType: 'A+', weight: '54 kg', height: '160 cm' },
  { id: 4, name: 'Omar', role: 'Son', age: 12, score: '95%', emoji: '👦', emotion: 'Playful', status: 'Healthy', phone: '+123 456 792', email: 'omar@family.com', location: 'Home', bloodType: 'A+', weight: '42 kg', height: '145 cm' },
  { id: 5, name: 'Grandpa', role: 'Grandfather', age: 72, score: '78%', emoji: '👴', emotion: 'Calm', status: 'Checkup Due', phone: '+123 456 793', email: 'grandpa@family.com', location: 'Home', bloodType: 'B+', weight: '78 kg', height: '175 cm' },
];

const FamilyProfile = ({ isCollapsed }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = familyData.find(m => m.id === parseInt(id));

  const [emergencyAlert, setEmergencyAlert] = React.useState(true);

  if (!member) {
    return <div className="profile-error">Member not found</div>;
  }

  return (
    <div className={`family-profile-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <header className="profile-hero-header">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <div className="profile-hero-content">
          <div className="profile-avatar-large">
            <span className="profile-emoji-large">{member.emoji}</span>
          </div>
          <div className="profile-main-info">
            <h1>{member.name}</h1>
            <div className="profile-badges">
              <span className="profile-role-tag">{member.role}</span>
              <span className={`profile-status-tag ${member.status.toLowerCase().replace(' ', '-')}`}>{member.status}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-content-grid">
        <section className="profile-vitals-section">
          <h2>Health Vitals</h2>
          <div className="vitals-grid">
            <div className="vital-card">
              <Heart className="vital-icon heart" size={24} />
              <div className="vital-text">
                <span>Health Score</span>
                <h3>{member.score}</h3>
              </div>
            </div>
            <div className="vital-card">
              <Activity className="vital-icon activity" size={24} />
              <div className="vital-text">
                <span>Emotion</span>
                <h3>{member.emotion}</h3>
              </div>
            </div>
            <div className="vital-card">
              <Droplets className="vital-icon drop" size={24} />
              <div className="vital-text">
                <span>Blood Type</span>
                <h3>{member.bloodType}</h3>
              </div>
            </div>
            <div className="vital-card">
              <Award className="vital-icon award" size={24} />
              <div className="vital-text">
                <span>Fitness Level</span>
                <h3>Elite</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-details-column">
          <div className="detail-group">
            <h3>Personal Info</h3>
            <div className="detail-list">
              <div className="detail-item">
                <Calendar size={18} />
                <div className="item-text">
                  <label>Age</label>
                  <span>{member.age} Years Old</span>
                </div>
              </div>
              <div className="detail-item">
                <Thermometer size={18} />
                <div className="item-text">
                  <label>Weight</label>
                  <span>{member.weight}</span>
                </div>
              </div>
              <div className="detail-item">
                <Wind size={18} />
                <div className="item-text">
                  <label>Height</label>
                  <span>{member.height}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-group">
            <h3>Contact details</h3>
            <div className="detail-list">
              <div className="detail-item">
                <Phone size={18} />
                <div className="item-text">
                  <label>Phone</label>
                  <span>{member.phone}</span>
                </div>
              </div>
              <div className="detail-item">
                <Mail size={18} />
                <div className="item-text">
                  <label>Email</label>
                  <span>{member.email}</span>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={18} />
                <div className="item-text">
                  <label>Location</label>
                  <span>{member.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-security-section">
          <div className="security-card">
            <Shield size={24} />
            <div className="security-info">
              <h4>Security Permissions</h4>
              <p>Full access to health logs and daily activity tracking system.</p>
            </div>
            <button className="security-btn">Manage</button>
          </div>
          
          <div className="emergency-alert-card">
            <AlertCircle size={24} />
            <div className="alert-info">
              <h4>Emergency Contact</h4>
              <p>Notify primary health provider in case of score drop below 70%.</p>
            </div>
            <div className={`custom-toggle ${emergencyAlert ? 'active' : ''}`} onClick={() => setEmergencyAlert(!emergencyAlert)}>
              <div className="handle"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FamilyProfile;

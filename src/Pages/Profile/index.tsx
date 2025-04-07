import React, { useState } from 'react';
import './Profile.scss';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('edit');

  const user = {
    name: 'Jacob Jones',
    email: 'ifrandom@gmail.com',
    phone: '(1) 2536 2561 2365',
    department: 'Design',
    designation: 'UI UX Designer',
    language: 'English',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>View Profile</h2>
      </div>
      <div className="profile-container">
        <div className="profile-left">
          <div className="avatar-container">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Avatar"
              className="avatar"
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="personal-info">
            <h4>Personal Info</h4>
            <ul>
              <li><strong>Full Name:</strong> {user.name}</li>
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>Phone:</strong> {user.phone}</li>
              <li><strong>Department:</strong> {user.department}</li>
              <li><strong>Designation:</strong> {user.designation}</li>
              <li><strong>Languages:</strong> {user.language}</li>
              <li><strong>Bio:</strong> {user.bio}</li>
            </ul>
          </div>
        </div>
        <div className="profile-right">
          <div className="tabs">
            <button
              className={activeTab === 'edit' ? 'active' : ''}
              onClick={() => setActiveTab('edit')}
            >
              Edit Profile
            </button>
            <button
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
            >
              Change Password
            </button>
            <button
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
            >
              Notification Settings
            </button>
          </div>

          {activeTab === 'edit' && (
            <form className="edit-form">
              <label>Full Name<input type="text" placeholder="Enter Full Name" /></label>
              <label>Email<input type="email" placeholder="Enter email address" /></label>
              <label>Phone<input type="text" placeholder="Enter phone number" /></label>
              <label>Department<input type="text" placeholder="Enter Department" /></label>
              <label>Designation<input type="text" placeholder="Enter Designation Title" /></label>
              <label>Language<input type="text" placeholder="Enter Language" /></label>
              <label>Description<textarea placeholder="Write description..."></textarea></label>
              <div className="form-actions">
                <button type="button" className="cancel">Cancel</button>
                <button type="submit" className="save">Save</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

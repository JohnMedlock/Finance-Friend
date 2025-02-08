import React from 'react';
import Header from '../components/Header';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div>
        <Header />
        <div className="profile-container">
            <img className="pfp" src="https://yt3.googleusercontent.com/lN_qKLHlrrbGS_uEj-62MWeSsx7W2biOFfk2Dqz-mX1ConUV3Rop3fNeL24uZXx-77amh_c-Ng=s900-c-k-c0x00ffffff-no-rj" alt="Profile" />
            <hr className="profile-vert-hr"></hr>
            <div className="profile-info-section">
                <h1>Profile</h1>
                <p>Username: <strong>admin</strong></p>
                <p>Location: <strong>Athens, GA</strong></p>
                <p>Characters: </p>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
import React from 'react';
import ProfileForm from './ProfileForm';
import PutProfileForm from './PutProfileForm';

const UserProfile = () => (
  <div className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <ProfileForm onSubmit={PutProfileForm}/>
        </div>
      </div>
    </div>
  </div>
);

export default UserProfile;
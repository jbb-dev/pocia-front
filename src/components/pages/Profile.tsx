import React from 'react';
import ProfileForm from '../Form/ProfileForm';
import { observer } from 'mobx-react';
import { DataStoreContext } from '../../store/rootStore';

const Profile: React.FC = observer(() => {

  const { user } = React.useContext(DataStoreContext);

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-10 flex flex-col justify-center">
        <h2 className="text-center text-3xl font-bold md:text-5xl">Profile</h2>
        <p className="mx-auto mb-8 mt-4 text-center text-sm text-[#636262] sm:text-base md:mb-12 lg:mb-16">Feel free to change your credentials at any time.</p>
        <img src={user.getUserAvatar()} className="h-32 mb-8 rounded-full mx-auto" alt="Logo" />
        <div className="mx-auto mb-4 max-w-[400px] pb-4">
          <ProfileForm />
        </div>
      </div>
    </section>  )
});

export default Profile
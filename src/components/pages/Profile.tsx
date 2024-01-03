import React from 'react';

type Props = {}

const Profile = (props: Props) => {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-10">
        <h2 className="text-center text-3xl font-bold md:text-5xl">Profile</h2>
        <p className="mx-auto mb-8 mt-4 text-center text-sm text-[#636262] sm:text-base md:mb-12 lg:mb-16">Feel free to change your credentials at any time.</p>
      </div>
    </section>  )
}

export default Profile
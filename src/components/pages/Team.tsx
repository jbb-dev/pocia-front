import React from 'react';
import AssistantCard from '../Assistant/AssistantCard';
import { FIXED_ASSISTANTS_LIST } from '../../utils/constants/assistants';

const Team: React.FC = () => {
  return ( 
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-10">
        <h2 className="text-center text-3xl font-bold md:text-5xl">Your Personnal Assistants</h2>
        <p className="mx-auto mb-8 mt-4 text-center text-sm text-[#636262] sm:text-base md:mb-12 lg:mb-16">Select the virtual assistant who fits you.</p>
        <div className="mx-auto grid justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:justify-items-stretch">
          {FIXED_ASSISTANTS_LIST.map((assistant,index) => 
            <AssistantCard 
              key={index}
              data={assistant}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
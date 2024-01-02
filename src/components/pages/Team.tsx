import React from 'react';
import AssistantCard from '../Assistant/AssistantCard';

export interface IAssistant {
  name: string;
  service: string;
  biography: string;
  avatar: string;
};

const dataAssistant: IAssistant[] = [
  { name: "Paul", service: "Marketing Manager", biography: "dqds", avatar:'https://www.master-of-finance.org/wp-content/uploads/2021/08/become-a-market-manager.jpg' },
  { name: "Tamara", service: "UI/UX Designer", biography: "dqds", avatar:'https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img/https://daninstitute.com/wp-content/uploads/2020/11/intro-front-mobile-1.png' },
  { name: "Kevin", service: "Product Manager", biography: "dqds", avatar:'https://www.mediabistro.com/wp-content/uploads/2017/05/Product-Manager.jpg' },
  { name: "Marie", service: "Juriste", biography: "dqds", avatar:'https://img.freepik.com/photos-gratuite/enseignante-pile-livres_23-2148635346.jpg?w=2000&t=st=1698610364~exp=1698610964~hmac=5f5e94997a1eca233775f973b081126635c1330e2229cde4c5209163c033b6a2' },
];


type Props = {}

const Team = (props: Props) => {
  return ( 
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-10">
        <h2 className="text-center text-3xl font-bold md:text-5xl">Our Team Members</h2>
        <p className="mx-auto mb-8 mt-4 text-center text-sm text-[#636262] sm:text-base md:mb-12 lg:mb-16">Select the virtual assistant who fits you.</p>
        <div className="mx-auto grid justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:justify-items-stretch">
          {dataAssistant.map((assistant,index) => 
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
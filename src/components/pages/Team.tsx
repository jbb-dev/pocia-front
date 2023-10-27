import React from 'react'

type Props = {}

const Team = (props: Props) => {
  return (
    
<section>
  <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
    <h2 className="text-center text-3xl font-bold md:text-5xl">Our Team Members</h2>
    <p className="mx-auto mb-8 mt-4 text-center text-sm text-[#636262] sm:text-base md:mb-12 lg:mb-16">Lorem ipsum dolor sit amet elit ut aliquam</p>
    <div className="mx-auto grid justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:justify-items-stretch">
      <div className="flex max-w-[288px] flex-col items-center gap-4 rounded-md border border-solid border-[#cdcdcd] px-8 py-6 md:max-w-full">
        <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94016de6cf90_Rectangle%2035.svg" alt="" className="mb-4 inline-block h-52 w-full object-cover" />
        <p className="font-bold">John</p>
        <p className="text-sm text-[#636262]">Webflow Developer</p>
      </div>
      <div className="flex max-w-[288px] flex-col items-center gap-4 rounded-md border border-solid border-[#cdcdcd] px-8 py-6 md:max-w-full">
        <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94016de6cf90_Rectangle%2035.svg" alt="" className="mb-4 inline-block h-52 w-full object-cover" />
        <p className="font-bold">Annisyah</p>
        <p className="text-sm text-[#636262]">Webflow Developer</p>
      </div>
      <div className="flex max-w-[288px] flex-col items-center gap-4 rounded-md border border-solid border-[#cdcdcd] px-8 py-6 md:max-w-full">
        <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94016de6cf90_Rectangle%2035.svg" alt="" className="mb-4 inline-block h-52 w-full object-cover" />
        <p className="font-bold">Tamara</p>
        <p className="text-sm text-[#636262]">UI/UX Designer</p>
      </div>
      <div className="flex max-w-[288px] flex-col items-center gap-4 rounded-md border border-solid border-[#cdcdcd] px-8 py-6 md:max-w-full">
        <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94016de6cf90_Rectangle%2035.svg" alt="" className="mb-4 inline-block h-52 w-full object-cover" />
        <p className="font-bold">Kevin</p>
        <p className="text-sm text-[#636262]">Product Manager</p>
      </div>
    </div>
  </div>
</section>
  )
}

export default Team
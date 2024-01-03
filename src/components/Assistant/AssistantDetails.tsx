import React from "react";
import Button from "../shared/Button";
import { DataStoreContext } from "../../store/rootStore";
import BackButton from "../shared/Navigation/BackButton";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../shared/Navigation/ERoutes";

const AssistantDetails: React.FC = () => {

  const { assistant, assistant: { tempAssistant } } = React.useContext(DataStoreContext);
  let navigate = useNavigate();

  const selectProfile = () => {
    assistant.setSelectedAssistant(tempAssistant);
    navigate(ERoutes.CONVERSATION);
  };

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        <BackButton />
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center rounded-md bg-[#c4c4c4] px-3 py-1">
              <div className="mr-1 h-2 w-2 rounded-full bg-[#009600]"></div>
              <p className="text-sm">Available for work</p>
            </div>
            <p className="text-sm text-[#808080] sm:text-xl">
              {tempAssistant?.job}
            </p>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8">
              {tempAssistant?.name}
            </h1>
            <p className="text-sm text-[#808080] sm:text-xl">
              {tempAssistant?.biography}
            </p>
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            <Button
              label={`Select ${tempAssistant?.name} as your assistant`}
              type="button"
              action={selectProfile}
            />
          </div>
          <div className="min-h-[530px] overflow-hidden rounded-md bg-[#f2f2f7]">
            <img src={tempAssistant?.avatar} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssistantDetails;

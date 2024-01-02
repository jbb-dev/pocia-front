import React from "react";
import { ReactComponent as BackIcon } from "../../../assets/icons/arrow-left.svg";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {

    let navigate = useNavigate();

    const moveBack = () => navigate(-1);

    return (
        <div className="flex mb-4 cursor-pointer items-center" onClick={moveBack}>
            <BackIcon width={"1.5rem"} />
            <p className="text-sm text-[#000000] sm:text-xl ml-1">Back</p>
        </div>
    );
};

export default BackButton;

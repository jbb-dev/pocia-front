import * as React from 'react';
import check from './../../assets/icons/check-blanc.svg';
import warning from './../../assets/icons/warning.svg';
import { observer } from 'mobx-react';
import { AlertStoreContext } from '../../store/alertStore';

const DELAY = 7000; // ms

export const SUCCESS_COLOR = "#046004";
export const FAIL_COLOR = "#d28a00";

export enum EToastStatus {
    NONE,
    SUCCESS,
    FAIL
}

const ToastAlert = observer(() => {

    const { alert } = React.useContext(AlertStoreContext);

    const hasAlert: boolean = alert.status != null && alert.status !== EToastStatus.NONE;

    const cleanAlert = (): void => {
        alert.setAlert(EToastStatus.NONE, null, null); // WAIT ANIMATION IS FINISHED BEFORE CHANGING ALERT STATUS (avoid color issue on ToastAlert if status becomes NONE)
    };

    const toastColor: string = alert.status === EToastStatus.FAIL ? FAIL_COLOR : SUCCESS_COLOR;

    const displayErrors = () => {
        if (alert.errors) {
            return (
                <ul className="p-0 m-0">
                    {alert.errors.map((error, index) => (
                        <li key={index} className="list-disc text-sm text-[#ffffff]">
                            {error}
                        </li>
                    ))}
                </ul>
            );
        }
    };

   // MANAGE ALERT AUTO OPsENING/CLOSING
    React.useEffect(() => {
        if (hasAlert) 
        {
            setTimeout(cleanAlert, DELAY); // Alert is shown for 7 seconds before starting to close
        }
    }, [hasAlert]);

return (
    <div 
        className="absolute left-1/2 top-16 mx-auto flex w-[90%] max-w-[960px] -translate-x-1/2 flex-col items-center rounded-xl p-4 sm:justify-between sm:px-8 md:flex-row md:py-6 lg:w-full mt-1"
        style={{zIndex: 99, background: toastColor}}
    >
        <div className="flex flex-row items-cente w-full">
            <img 
                src={alert.status === EToastStatus.FAIL ? warning : check} 
                alt="indicator" 
                className={`h-5 w-5 rounded-full mr-2`}
                style={{backgroundColor: toastColor}}
            />
            <div>
                <p className="text-sm text-[#ffffff] mb-1">
                    {alert.message}
                </p>
                {displayErrors()}
            </div>
        </div>
        <div className="mt-4 flex flex-row items-center justify-center gap-4 md:mt-0">
            <img 
                onClick={cleanAlert}
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/646723d38ca7fbe390224779_ri_close-circle-fill%20(1).svg" 
                alt="" 
                className="absolute bottom-auto left-auto right-[1%] top-[3%] w-6 md:relative md:right-0 md:w-8 cursor-pointer" 
            />
        </div>
    </div>
    );
});

export default ToastAlert;

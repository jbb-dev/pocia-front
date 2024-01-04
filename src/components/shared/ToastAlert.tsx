import * as React from 'react';
import check from './../../assets/icons/check-blanc.svg';
import warning from './../../assets/icons/warning.svg';
import { observer } from 'mobx-react';
import { AlertStoreContext } from '../../store/alertStore';

const DELAY = 1000; // ms

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
        setTimeout(() => alert.setAlert(EToastStatus.NONE, null, null), DELAY); // WAIT ANIMATION IS FINISHED BEFORE CHANGING ALERT STATUS (avoid color issue on ToastAlert if status becomes NONE)
    };

    const toastColor: string = alert.status === EToastStatus.FAIL ? FAIL_COLOR : SUCCESS_COLOR;

    const displayErrors = () => {
        if (alert.errors) {
            return (
                <ul className="p-0 m-0">
                    {alert.errors.map((error, index) => (
                        <li key={index}>
                            <p>
                                {error}
                            </p>
                        </li>
                    ))}
                </ul>
            );
        }
    };

   // MANAGE ALERT AUTO OPENING/CLOSING
    React.useEffect(() => {
        if (hasAlert) {
            setTimeout(cleanAlert, 7000); // Alert is shown for 5 seconds before starting to close
        }
    }, [hasAlert]);

    return (
        <>
            <div 
                className="absolute left-1/2 top-16 mx-auto flex w-[90%] max-w-[960px] -translate-x-1/2 flex-col items-center rounded-xl bg-black p-4 sm:justify-between sm:px-8 md:flex-row md:py-6 lg:w-full mt-1"
                style={{zIndex: 99}}
            >
                <div className="flex flex-row items-cente w-full">
                    <div style={{width: '15%'}}>
                        <div 
                            className='h-8 w-8 flex items-center justify-center mr-4 rounded-full max-w-10'
                            style={{
                                backgroundColor: toastColor,
                            }}
                        >
                            <img 
                                src={alert.status === EToastStatus.FAIL ? warning : check} 
                                alt="indicator" 
                                className={`h-5 w-5 rounded-full`}
                                style={{backgroundColor: toastColor}}
                            />
                        </div>
                    </div>
                    <div style={{width: '80%'}}>
                        <p className="text-sm text-[#ffffff]">
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
            {/* {alert.status != null && alert.status !== EToastStatus.NONE && (
                <div
                    className={`fixed left-1/2 top-${HEADER_HEIGHT} p-4 transform ${
                        open ? '' : '-translate-x-1/2'
                    } bg-${toastColor} text-white w-${TOAST_WIDTH} min-h-${TOAST_HEIGHT} rounded-lg z-10 flex items-start`}
                >
                    <div
                        className={`background-image bg-center bg-no-repeat bg-${toastIcon} bg-${toastColor} min-w-12 h-12`}
                    />
                    <div>
                        <p>
                            {alert.message}
                        </p>
                        {displayErrors()}
                    </div>
                    <div
                        className="background bg-center bg-no-repeat bg-close w-8 h-8 rounded-full absolute right-2 top-0 bg-grayLightest cursor-pointer"
                        onClick={cleanAlert}
                    />
                </div>
            )} */}
        </>
    );
});

export default ToastAlert;

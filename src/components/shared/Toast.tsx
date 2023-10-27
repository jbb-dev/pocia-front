import * as React from 'react';
import check from './../../assets/icons/check-blanc.svg';
import warning from './../../assets/icons/warning.svg';
import { observer } from 'mobx-react';
import { AlertStoreContext } from '../../store/alertStore';

const HEADER_HEIGHT = '5rem';

const TOAST_WIDTH = '90%';
const TOAST_HEIGHT = '5.5rem';

const DELAY = 1000; // ms

export const SUCCESS_COLOR = "green";
export const FAIL_COLOR = "orange";

export enum EToastStatus {
    NONE,
    SUCCESS,
    FAIL
}

const Toast = observer(() => {

    const { alert } = React.useContext(AlertStoreContext);

    const hasAlert: boolean = alert.status != null && alert.status !== EToastStatus.NONE;

    const [open, setOpen] = React.useState<boolean>(false);

    const cleanAlert = (): void => {
        setOpen(false); // FIRST CHANGE STATE OPEN TO FALSE
        setTimeout(() => alert.setAlert(EToastStatus.NONE, null, null), DELAY); // WAIT ANIMATION IS FINISHED BEFORE CHANGING ALERT STATUS (avoid color issue on Toast if status becomes NONE)
    };

    const toastColor: string = alert.status === EToastStatus.FAIL ? FAIL_COLOR : SUCCESS_COLOR;
    const toastIcon: string = alert.status === EToastStatus.FAIL ? warning : check;

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
            setOpen(true);
            setTimeout(cleanAlert, 7000); // Alert is shown for 5 seconds before starting to close
        }
    }, [hasAlert]);

    return (
        <>
            {alert.status != null && alert.status !== EToastStatus.NONE && (
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
            )}
        </>
    );
});

export default Toast;

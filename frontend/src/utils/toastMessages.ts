import { ToastOptions, toast } from "react-toastify";

// Toast configurations.
const toastConfig: ToastOptions = {
	position: "bottom-left",
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
};


/**
 * Create a toast success message.
 * @param message The message to display.
 * @param timeout How long the message should be displayed.
 */
function toastSuccess(message: string, timeout=5000) {
	toast.success(message, {
		...toastConfig,
		autoClose: timeout,
	});
}

/**
 * Create a toast info message.
 * @param message The message to display.
 * @param timeout How long the message should be displayed.
 */
function toastInfo(message: string, timeout=5000) {
	toast.info(message, {
		...toastConfig,
		autoClose: timeout,
	});
}

/**
 * Create a toast warn message.
 * @param message The message to display.
 * @param timeout How long the message should be displayed.
 */
function toastWarn(message: string, timeout=5000) {
	toast.warn(message, {
		...toastConfig,
		autoClose: timeout,
	});
}

/**
 * Create a toast error message.
 * @param message The message to display.
 * @param timeout How long the message should be displayed.
 */
function toastError(message: string, timeout=5000) {
	toast.error(message, {
		...toastConfig,
		autoClose: timeout,
	});
}

export { toastSuccess, toastInfo, toastWarn, toastError };

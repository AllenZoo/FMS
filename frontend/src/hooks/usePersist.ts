import { useState, useEffect } from "react";


/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */
/**
 * Hook to persist data in local storage.
 */
const usePersist = (): [
	boolean,
	React.Dispatch<React.SetStateAction<boolean>>
] => {
	const [persist, setPersist] = useState<boolean>(
		localStorage.getItem("persist") === "true" ? true : false
	);

	/**
	 * Update local storage when persist changes.
	 */
	useEffect(() => {
		localStorage.setItem(
			"persist",
			JSON.stringify(persist).replace(/"/g, "") as unknown as string
		);
	}, [persist]);

	return [persist, setPersist];
};

export default usePersist;

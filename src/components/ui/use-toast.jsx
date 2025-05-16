
import React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

function genId() {
	count = (count + 1) % Number.MAX_VALUE;
	return count.toString();
}

const reducers = {
	ADD_TOAST: (state, action) => {
		return {
			...state,
			toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
		};
	},
	UPDATE_TOAST: (state, action) => {
		return {
			...state,
			toasts: state.toasts.map((t) =>
				t.id === action.toast.id ? { ...t, ...action.toast } : t
			),
		};
	},
	DISMISS_TOAST: (state, action) => {
		const { toastId } = action;

		return {
			...state,
			toasts: state.toasts.filter((t) => t.id !== toastId),
		};
	},
	REMOVE_TOAST: (state, action) => {
		const { toastId } = action;
		return {
			...state,
			toasts: state.toasts.filter((t) => t.id !== toastId),
		};
	},
};

const memoryState = { toasts: [] };
const listeners = [];

function dispatch(action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}

function reducer(state, action) {
	const fn = reducers[action.type];
	return fn ? fn(state, action) : state;
}

function toast(props) {
	const id = genId();

	const update = (props) =>
		dispatch({
			type: 'UPDATE_TOAST',
			toast: { ...props, id },
		});
	const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

	dispatch({
		type: 'ADD_TOAST',
		toast: {
			...props,
			id,
			open: true,
			onOpenChange: (open) => {
				if (!open) dismiss();
			},
		},
	});

	return {
		id: id,
		dismiss,
		update,
	};
}

function useToast() {
	const [state, setState] = React.useState(memoryState);

	React.useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}, [state]);

	return {
		...state,
		toast,
		dismiss: (toastId) => dispatch({ type: 'DISMISS_TOAST', toastId }),
	};
}

export { useToast, toast };


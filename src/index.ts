import { useState, useEffect } from 'react';

export function createZignal<T>(initial: T) {
	let value = initial;
	const listeners = new Set<() => void>();
	const set = (v: T) => {
		value = v;
		listeners.forEach(fn => fn());
	};
	const subscribe = (fn: () => void) => {
		listeners.add(fn);
		return () => { listeners.delete(fn); };
	};
	const get = () => value;
	const useZignal = () => {
		const [, forceUpdate] = useState({});
		useEffect(() => {
			const cb = () => forceUpdate({});
			return subscribe(cb);
		}, []);
		return [get(), set] as [T, (v: T) => void];
	};
	type ZignalHook = typeof useZignal & { store: { get: () => T; set: (v: T) => void; subscribe: (fn: () => void) => () => void } };
	(useZignal as ZignalHook).store = { get, set, subscribe };
	return useZignal as ZignalHook;
} 
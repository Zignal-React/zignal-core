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
	(useZignal as any).store = { get, set, subscribe };
	return useZignal as typeof useZignal & { store: { get: () => T; set: (v: T) => void; subscribe: (fn: () => void) => () => void } };
} 
import { useMatches } from 'react-router';
import { AppRouteHandle } from './handle';

export const useRouteMeta = () => {
	const matches = useMatches();

	// Find the deepest match that has a title
	const titleMatch = [...matches]
		.reverse()
		.find((m) => (m.handle as AppRouteHandle)?.title);

	// Find the match that defines the tabs
	const tabMatch = [...matches]
		.reverse()
		.find((m) => (m.handle as AppRouteHandle)?.tabs);

	return {
		title: (titleMatch?.handle as AppRouteHandle)?.title,
		tabs: (tabMatch?.handle as AppRouteHandle)?.tabs,
		tabBasePath: tabMatch?.pathname || '',
	};
};

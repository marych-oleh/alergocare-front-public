export interface HandleRouteTab {
	label: string;
	path: string;
	icon?: React.ElementType;
}

export interface AppRouteHandle {
	title?: string;
	tabs?: HandleRouteTab[];
}

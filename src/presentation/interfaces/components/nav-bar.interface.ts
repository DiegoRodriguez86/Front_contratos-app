export interface IOption {
	label: string;
	action: () => void;
}
export interface INavBar {
	title?: string;
	email?: string;
	name?: string;
	options?: IOption[];
}
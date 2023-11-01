export interface UserData {
	email: string;
	emailVerified: boolean | null;
	image: string;
	name: string;
	role: string;
	uid: string;
	username: string;
	trip_list: Trip[];
}
export interface Trip {
	trip_id: string;
	trip_name: string;
	trip_schedule: number;
	currentYear: number;
	currentMonth: number;
	currentDay: number;
	endDay: number;
}
export interface IMyScheduleItem {
	title: string;
	index: number;
}

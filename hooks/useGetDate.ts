export const goNextDate = (year: number, month: number) => {
	if (month < 12) {
		month += 1;
	} else {
		year += 1;
		month = 1;
	}
	return { year, month };
};
export const goPrevDate = (year: number, month: number) => {
	if (month > 1) {
		month -= 1;
	} else {
		year -= 1;
		month = 12;
	}
	return { year, month };
};

import React from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Textarea,
	Typography,
} from '@material-tailwind/react';

const EnrollSchedule = () => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(!open);

	return (
		<>
			<Button onClick={handleOpen}>일정 추가</Button>
			<Dialog open={open} size="xs" handler={handleOpen}>
				<div className="flex items-center justify-between">
					<DialogHeader className="flex flex-col items-start">
						{' '}
						<Typography className="mb-1" variant="h4">
							나의 일정 등록
						</Typography>
					</DialogHeader>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="mr-3 h-5 w-5"
						onClick={handleOpen}
					>
						<path
							fillRule="evenodd"
							d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<DialogBody>
					<Typography className="mb-10 -mt-7 " color="gray" variant="lead">
						일정 등록
					</Typography>
					<div className="grid gap-6">
						<Typography className="-mb-1" color="blue-gray" variant="h6">
							대표 제목
						</Typography>
						<Input
							label="대표 일정 제목"
							color="blue"
							error={false}
							success={false}
							crossOrigin={undefined}
						/>
						<Textarea label="자세한 일정을 기록해주세요" />
					</div>
				</DialogBody>
				<DialogFooter className="space-x-2">
					<Button
						className="bg-primary-color"
						variant="text"
						color="gray"
						onClick={handleOpen}
					>
						취소
					</Button>
					<Button
						className="bg-primary-color"
						variant="gradient"
						onClick={handleOpen}
					>
						완료
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default EnrollSchedule;

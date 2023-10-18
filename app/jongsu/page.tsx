'use client';

import React, { useState, useEffect } from 'react';

const MODAL = () => {
	const [state, setState] = useState<boolean>(false);

	// 1번 케이스
	useEffect(() => {
		alert('모달의 상태가 변경됨'); // 모달이 열렸는 지 닫혔는 지 파악할 수 없음
	}, [state]);

	// 2번 케이스
	const openModal = () => {
		setState((prev) => !prev);
		alert('모달이 열림');
	};

	const closeModal = () => {
		setState((prev) => !prev);
		alert('모달이 닫힘');
	};

	return (
		<>
			{/* useEffect를 사용할 경우 모달이 열렸는 지 닫혔는 지 파악할 수 없음 */}
			<div>
				{state && <div>모달</div>}
				<button
					type="button"
					onClick={() => {
						setState((prev) => !prev);
					}}
				>
					모달 열기
				</button>
				<button type="button" onClick={closeModal}>
					모달 닫기
				</button>
			</div>
			{/* 각 handler에서 사용할 경우 모달이 열렸는 지 닫혔는 지 파악할 수 있음 */}
			<div>
				{state && <div>모달</div>}
				<button type="button" onClick={openModal}>
					모달 열기
				</button>
				<button type="button" onClick={closeModal}>
					모달 닫기
				</button>
			</div>
		</>
	);
};

export default MODAL;

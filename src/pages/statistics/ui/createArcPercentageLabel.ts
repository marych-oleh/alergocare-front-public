export const createArcPercentageLabel = (data: { value: number }[]) => {
	const total = data.reduce((sum, item) => sum + item.value, 0);
	return (item: { value: number }) => {
		const percent = total > 0 ? (item.value / total) * 100 : 0;
		return percent >= 6 ? `${percent.toFixed(0)}%` : '';
	};
};

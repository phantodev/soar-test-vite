import type { FC } from "react";
import { Spinner } from "@heroui/spinner";

interface LoadingSpinnerProps {
	isLoading: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ isLoading }) => {
	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
				<Spinner size="lg" color="primary" />
				<p className="mt-3 text-gray-700 font-medium">Loading data...</p>
			</div>
		</div>
	);
};

export default LoadingSpinner;

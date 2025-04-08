import type { FC } from "react";

interface CardProps {
	variant: "dark" | "light";
	balance: string;
	cardHolder: string;
	validThru: string;
	cardNumber: string;
}

const CardComponent: FC<CardProps> = ({
	variant,
	balance,
	cardHolder,
	validThru,
	cardNumber,
}) => {
	const isDark = variant === "dark";
	const chipImage = isDark
		? "/assets/chip-card-black.svg"
		: "/assets/chip-card-white.svg";
	const logoImage = isDark
		? "/assets/logo-mastercard-white.svg"
		: "/assets/logo-mastecard-grey.svg";

	return (
		<div
			className={`relative w-[265px] sm:w-full sm:max-w-[350px] h-[170px] sm:h-[200px] md:h-[235px] rounded-2xl pb-2 ${
				isDark
					? "bg-gray-800 text-white"
					: "bg-white text-gray-800 border border-gray-200"
			}`}
		>
			<div className="flex flex-col h-full justify-between">
				<div className="flex justify-between items-start p-4 sm:p-5 md:p-6">
					<div>
						<p className="text-xs sm:text-sm opacity-70">Balance</p>
						<p className="text-xl sm:text-2xl font-bold">{balance}</p>
					</div>
					<div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
						<img
							src={chipImage}
							alt="Card chip"
							className="w-10 h-10 object-contain"
						/>
					</div>
				</div>
				<div className="flex justify-between items-center px-4 sm:px-5 md:px-6">
					<div>
						<p className="text-[10px] sm:text-xs opacity-70">CARD HOLDER</p>
						<p className="text-xs sm:text-sm md:text-base font-medium">
							{cardHolder}
						</p>
					</div>
					<div>
						<p className="text-[10px] sm:text-xs opacity-70">VALID THRU</p>
						<p className="text-xs sm:text-sm md:text-base font-medium">
							{validThru}
						</p>
					</div>
				</div>
				<div className="">
					<div className="flex justify-between items-center px-4 sm:px-5 md:px-6">
						<p className="text-sm sm:text-base md:text-lg tracking-wider">
							{cardNumber}
						</p>
						<div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
							<img
								src={logoImage}
								alt="Mastercard logo"
								className="w-10 h-10 object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardComponent;

import { type FC, useState } from "react";

interface Contact {
	name: string;
	avatar: string;
	role: string;
}

interface QuickTransferProps {
	contacts: Contact[];
}

const defaultContacts: Contact[] = [
	{
		name: "Livia Bator",
		avatar: "/assets/avatar-livia.png",
		role: "CEO",
	},
	{
		name: "Randy Press",
		avatar: "/assets/avatar-randy.png",
		role: "Director",
	},
	{
		name: "Workman",
		avatar: "/assets/avatar-workman.png",
		role: "Designer",
	},
];

const QuickTransfer: FC<QuickTransferProps> = ({
	contacts = defaultContacts,
}) => {
	const [amount, setAmount] = useState<string>("");

	return (
		<div className="w-full bg-white lg:rounded-2xl lg:p-6 lg:border lg:border-gray-200">
			<div className="p-2">
				{/* Contacts row */}
				<div className="flex justify-start lg:space-x-8 mb-6">
					{contacts.map((contact) => (
						<div key={contact.name} className="flex flex-col items-center w-24">
							<div className="relative w-12 h-12 lg:w-16 lg:h-16 mb-2">
								<img
									src={contact.avatar}
									alt={contact.name}
									className="rounded-full object-cover"
								/>
							</div>
							<span className="text-xs lg:text-sm font-medium text-gray-800">
								{contact.name}
							</span>
							<span className="text-xs lg:text-sm text-gray-500">
								{contact.role}
							</span>
						</div>
					))}
					<button
						type="button"
						className="flex items-center justify-center border border-gray-100 size-10 lg:size-12 rounded-full bg-white shadow-lg self-center"
					>
						<img
							src="/assets/arrow-icon.svg"
							alt="Next"
							width={10}
							height={10}
						/>
					</button>
				</div>

				{/* Amount input and send button */}
				<div className="mt-4">
					<div className="flex items-center">
						<p className="text-sm lg:text-md text-secondary mr-4">
							Write Amount
						</p>
						<div className="relative flex-1">
							<input
								id="amount"
								type="text"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="525.50"
								className="w-full bg-secondary/10 rounded-full h-12 px-6 pr-[120px] text-gray-800 focus:outline-none text-xs lg:text-md"
							/>
							<button
								type="button"
								className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-800 text-white text-sm lg:text-md rounded-full px-6 h-10 lg:h-12 min-w-[100px]"
							>
								<span>Send</span>
								<img
									src="/assets/sent-icon.svg"
									alt="Send"
									width={20}
									height={20}
									className="ml-2"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuickTransfer;

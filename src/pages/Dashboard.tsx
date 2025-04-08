import MyCardsSection from "../components/Dashboard/MyCardsSection";
import ActivitySection from "../components/Dashboard/ActivitySection";
import TransferSection from "../components/Dashboard/TransferSection";

const DashboardPage = () => {
	return (
		<div className="sm:p-4 md:p-6">
			<MyCardsSection />
			<div className="mt-6 sm:mt-8 md:mt-10">
				<ActivitySection />
			</div>
			<div className="mt-6 sm:mt-8 md:mt-10">
				<TransferSection />
			</div>
		</div>
	);
};

export default DashboardPage;

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Settings = lazy(() => import("../pages/Settings"));

// Placeholder pages for other routes
const AccountsPage = () => <div className="p-6">Accounts Page</div>;
const TransactionsPage = () => <div className="p-6">Transactions Page</div>;
const InvestmentsPage = () => <div className="p-6">Investments Page</div>;
const CreditCardsPage = () => <div className="p-6">Credit Cards Page</div>;
const LoansPage = () => <div className="p-6">Loans Page</div>;
const ServicesPage = () => <div className="p-6">Services Page</div>;
const MyPrivilegesPage = () => <div className="p-6">My Privileges Page</div>;

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={
				<Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
					<Login />
				</Suspense>
			} />
			
			{/* Protected routes with MainLayout as parent */}
			<Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
				<Route path="/dashboard" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<Dashboard />
					</Suspense>
				} />
				<Route path="/accounts" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<AccountsPage />
					</Suspense>
				} />
				<Route path="/transactions" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<TransactionsPage />
					</Suspense>
				} />
				<Route path="/investments" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<InvestmentsPage />
					</Suspense>
				} />
				<Route path="/credit-cards" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<CreditCardsPage />
					</Suspense>
				} />
				<Route path="/loans" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<LoansPage />
					</Suspense>
				} />
				<Route path="/services" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<ServicesPage />
					</Suspense>
				} />
				<Route path="/my-privileges" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<MyPrivilegesPage />
					</Suspense>
				} />
				<Route path="/settings" element={
					<Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
						<Settings />
					</Suspense>
				} />
			</Route>
			
			<Route path="*" element={
				<Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
					<NotFound />
				</Suspense>
			} />
		</Routes>
	);
};

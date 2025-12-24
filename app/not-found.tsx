"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
	const [stage, setStage] = useState(0);

	useEffect(() => {
		const timer1 = setTimeout(() => setStage(1), 100);
		const timer2 = setTimeout(() => setStage(2), 800);
		const timer3 = setTimeout(() => setStage(3), 1600);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
			clearTimeout(timer3);
		};
	}, []);

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center">
			{/* Expanding rings background */}
			{stage >= 1 && (
				<motion.div
					className="absolute rounded-full border-8 border-primary/20"
					initial={{ width: 0, height: 0 }}
					animate={{ width: "200vmax", height: "200vmax" }}
					transition={{ duration: 1.2, ease: "easeOut" }}
				/>
			)}
			{stage >= 2 && (
				<motion.div
					className="absolute rounded-full border-8 border-primary/40"
					initial={{ width: 0, height: 0 }}
					animate={{ width: "200vmax", height: "200vmax" }}
					transition={{ duration: 1.2, ease: "easeOut" }}
				/>
			)}

			{/* Single centered content - no duplication */}
			<div className="relative z-10 flex flex-col items-center justify-center space-y-6 px-4 text-center">
				{/* 404 - appears with first ring */}
				{stage >= 1 && (
					<motion.h1
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, delay: 0.3 }}
						className="text-9xl font-black tracking-tighter text-primary"
					>
						404
					</motion.h1>
				)}

				{/* Not Found - appears with second ring */}
				{stage >= 2 && (
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 }}
						className="text-4xl font-bold text-foreground"
					>
						Not Found
					</motion.h2>
				)}

				{/* Description and buttons - appear last */}
				{stage >= 3 && (
					<>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4 }}
							className="max-w-md text-lg text-muted-foreground"
						>
							The page you&apos;re looking for doesn&apos;t exist or has been
							moved.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.2 }}
							className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
						>
							<Link
								href="/"
								className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
							>
								<Home className="h-4 w-4" />
								Back to Home
							</Link>
							<button
								type="button"
								onClick={() => window.history.back()}
								className="inline-flex items-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
							>
								<ArrowLeft className="h-4 w-4" />
								Go Back
							</button>
						</motion.div>
					</>
				)}
			</div>
		</div>
	);
}

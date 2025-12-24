"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
	const [stage, setStage] = useState(0);

	useEffect(() => {
		// Stage progression: 0 (initial) -> 1 (404) -> 2 (Not Found)
		const timer1 = setTimeout(() => setStage(1), 500);
		const timer2 = setTimeout(() => setStage(2), 1500);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, []);

	// Concentric circle colors from center outward
	const circles = [
		{ size: 0, color: "rgba(239, 68, 68, 1)", delay: 0 }, // Primary red - center
		{ size: 200, color: "rgba(239, 68, 68, 0.8)", delay: 0.1 },
		{ size: 400, color: "rgba(239, 68, 68, 0.6)", delay: 0.2 },
		{ size: 600, color: "rgba(239, 68, 68, 0.4)", delay: 0.3 },
		{ size: 800, color: "rgba(239, 68, 68, 0.2)", delay: 0.4 },
	];

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center">
			{/* Expanding concentric circles */}
			<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
				{circles.map((circle, index) => (
					<motion.div
						key={index}
						className="absolute rounded-full"
						initial={{
							width: circle.size,
							height: circle.size,
							scale: 0,
							opacity: 0,
						}}
						animate={{
							scale: stage >= 1 ? 20 : 0,
							opacity: stage >= 1 ? 1 : 0,
						}}
						transition={{
							duration: 2,
							delay: circle.delay,
							ease: "easeOut",
						}}
						style={{
							backgroundColor: circle.color,
							mixBlendMode: "screen",
						}}
					/>
				))}
			</div>

			{/* Content */}
			<div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center">
				{/* 404 Message */}
				<AnimatePresence mode="wait">
					{stage >= 1 && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 0.6,
								ease: "easeOut",
							}}
							className="space-y-4"
						>
							<motion.h1
								className="text-9xl font-black tracking-tighter text-primary"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3, duration: 0.6 }}
							>
								404
							</motion.h1>

							{stage >= 2 && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}
									className="space-y-6"
								>
									<h2 className="text-3xl font-bold text-foreground">
										Page Not Found
									</h2>
									<p className="max-w-md text-lg text-muted-foreground">
										The page you&apos;re looking for doesn&apos;t exist or has
										been moved.
									</p>

									{/* Action buttons */}
									<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Link
												href="/"
												className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
											>
												<Home className="h-4 w-4" />
												Back to Home
											</Link>
										</motion.div>

										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<button
												type="button"
												onClick={() => window.history.back()}
												className="inline-flex items-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
											>
												<ArrowLeft className="h-4 w-4" />
												Go Back
											</button>
										</motion.div>
									</div>
								</motion.div>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

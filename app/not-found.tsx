"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
	const [showRing1, setShowRing1] = useState(false);
	const [showRing2, setShowRing2] = useState(false);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		// Staged ring expansion
		const timer1 = setTimeout(() => setShowRing1(true), 100);
		const timer2 = setTimeout(() => setShowRing2(true), 800);
		const timer3 = setTimeout(() => setShowContent(true), 1600);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
			clearTimeout(timer3);
		};
	}, []);

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center">
			{/* First ring - reveals "404" */}
			<motion.div
				className="absolute rounded-full border-8 border-primary/20 flex items-center justify-center"
				initial={{ width: 0, height: 0, opacity: 0 }}
				animate={{
					width: showRing1 ? "200vmax" : 0,
					height: showRing1 ? "200vmax" : 0,
					opacity: showRing1 ? 1 : 0,
				}}
				transition={{ duration: 1.2, ease: "easeOut" }}
			>
				<AnimatePresence>
					{showRing1 && !showRing2 && (
						<motion.h1
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{ duration: 0.4, delay: 0.3 }}
							className="text-9xl font-black tracking-tighter text-primary absolute"
						>
							404
						</motion.h1>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Second ring - reveals "Not Found" */}
			<motion.div
				className="absolute rounded-full border-8 border-primary/40 flex items-center justify-center"
				initial={{ width: 0, height: 0, opacity: 0 }}
				animate={{
					width: showRing2 ? "200vmax" : 0,
					height: showRing2 ? "200vmax" : 0,
					opacity: showRing2 ? 1 : 0,
				}}
				transition={{ duration: 1.2, ease: "easeOut" }}
			>
				<AnimatePresence>
					{showRing2 && !showContent && (
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{ duration: 0.4, delay: 0.3 }}
							className="absolute text-center"
						>
							<h1 className="text-9xl font-black tracking-tighter text-primary">
								404
							</h1>
							<h2 className="text-4xl font-bold text-foreground mt-4">
								Not Found
							</h2>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Final content */}
			<AnimatePresence>
				{showContent && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center"
					>
						<div className="space-y-6">
							<h1 className="text-9xl font-black tracking-tighter text-primary">
								404
							</h1>
							<h2 className="text-4xl font-bold text-foreground">
								Page Not Found
							</h2>
							<p className="max-w-md text-lg text-muted-foreground">
								The page you&apos;re looking for doesn&apos;t exist or has been
								moved.
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
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

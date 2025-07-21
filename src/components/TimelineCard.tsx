import { motion } from 'framer-motion'

const TimelineCard = ({ section }) => {
	const timeline = [
		"big bang",
		"other stuff",
		"parents bang",
		"Guam born",
		"rockband.com",
		"existential crisis",
		"finds philosophy",
		"makes music",
		"idiguam.com",
		"real estate",
		"appacademy.io",
		"energy internship",
		"Singapore conferences",
		"anchormarianas.com",
		"verticalguam.com",
		"ns.com"
	]

	return (
		<motion.div
			animate={{ opacity: ['all', 'about', 'timeline'].includes(section) ? 1 : 0.3 }}
			className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-3xl col-span-3 md:col-span-4 p-4 md:p-6"	
			whileHover="groupHover"
			variants={{
				groupHover: {
					scale: 1.01,
					transition: {
						duration: 0.1,
						ease: 'easeInOut',
					},
				},
			}}
		>
			<div className="text-black dark:text-white text-xl md:text-2xl font-bold font-nunito mb-4">
				⏰ Timeline
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm md:text-base">
				{timeline.map((item, index) => (
					<div key={index} className="text-gray-600 dark:text-gray-400 py-1">
						• {item}
					</div>
				))}
			</div>
		</motion.div>
	)
}

export default TimelineCard
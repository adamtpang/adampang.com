import { motion } from 'framer-motion'
import { ArrowCircleUpIcon } from '@heroicons/react/outline'

const CompanyCard = ({ section }) => {
	return (
		<motion.a
			href="https://anchormarianas.com"
			target="_blank"
			rel="noreferrer"
			animate={{ opacity: ['all', 'about', 'work'].includes(section) ? 1 : 0.3 }}
			className="flex flex-col justify-center items-center bg-black border-2 border-gray-300 dark:bg-white dark:border-gray-700 relative rounded-3xl col-span-2 p-4"	
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
			<div className="text-white dark:text-black text-lg md:text-2xl font-bold font-nunito mb-2">
				⚓ Anchor Marianas
			</div>
			<div className="text-gray-300 dark:text-gray-700 text-sm md:text-base text-center">
				My Company
			</div>
			<ArrowCircleUpIcon className="absolute stroke-white dark:stroke-black bottom-0 right-0 m-2 md:m-5 md:mb-5 xl:m-5 rotate-45 mb-2 mr-2 w-8 h-8 lg:w-14 lg:h-14 md:w-10 md:h-10" />
		</motion.a>
	)
}

export default CompanyCard
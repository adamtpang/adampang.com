import { motion } from 'framer-motion'
import { ArrowCircleUpIcon } from '@heroicons/react/outline'

const YouTubeCard = ({ section }) => {
	return (
		<motion.a
			href="https://youtube.com/@adamtpang"
			target="_blank"
			rel="noreferrer"
			animate={{ opacity: ['all', 'about', 'contact'].includes(section) ? 1 : 0.3 }}
			className="flex justify-center items-center bg-black relative dark:bg-white rounded-3xl col-span-1"	
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
			<div className="w-10 md:w-20 lg:w-32 xl:w-1/2">
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className="fill-current text-white dark:text-black"
				>
					<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
				</svg>
			</div>
			<ArrowCircleUpIcon className="absolute stroke-white dark:stroke-black bottom-0 right-0 m-2 md:m-5 md:mb-5 xl:m-5 rotate-45 mb-2 mr-2 w-8 h-8 lg:w-14 lg:h-14 md:w-10 md:h-10" />
		</motion.a>
	)
}

export default YouTubeCard
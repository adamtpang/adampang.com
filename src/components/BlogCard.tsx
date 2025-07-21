import { motion } from 'framer-motion'
import { ArrowCircleUpIcon } from '@heroicons/react/outline'

const BlogCard = ({ section }) => {
	return (
		<motion.a
			href="https://adampang.com/blog"
			target="_blank"
			rel="noreferrer"
			animate={{ opacity: ['all', 'about', 'writing'].includes(section) ? 1 : 0.3 }}
			className="flex flex-col justify-center items-center bg-white border-2 border-black dark:bg-black dark:border-white relative rounded-3xl col-span-2 p-4"	
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
			<div className="text-black dark:text-white text-lg md:text-2xl font-bold font-nunito mb-2">
				✍️ Blog
			</div>
			<div className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center">
				Thoughts & Writing
			</div>
			<ArrowCircleUpIcon className="absolute stroke-black dark:stroke-white bottom-0 right-0 m-2 md:m-5 md:mb-5 xl:m-5 rotate-45 mb-2 mr-2 w-8 h-8 lg:w-14 lg:h-14 md:w-10 md:h-10" />
		</motion.a>
	)
}

export default BlogCard
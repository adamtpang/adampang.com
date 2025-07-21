import { motion } from 'framer-motion'

const BookshelfCard = ({ section }) => {
	const books = [
		"The Beginning of Infinity",
		// Add more favorite books here
	]

	return (
		<motion.div
			animate={{ opacity: ['all', 'about', 'reading'].includes(section) ? 1 : 0.3 }}
			className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-3xl col-span-2 p-4 md:p-6"	
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
				📚 Bookshelf
			</div>
			<div className="space-y-2">
				{books.map((book, index) => (
					<div key={index} className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
						• {book}
					</div>
				))}
			</div>
		</motion.div>
	)
}

export default BookshelfCard
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
	return (
		<Html className="">
			<Head>
				<title>adampang.com</title>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<meta name="title" content="Adam Pang" />
				{/* facebook  / open graph */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://adampang.com"></meta>
				<meta property="og:title" content="Adam Pang" />
				<meta property="og:description" content="" />
				<meta property="og:image" content="https://anahoward.me/images/preview.png"></meta>

				{/* twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://adampang.com" />
				<meta property="twitter:title" content="Adam Pang" />
				<meta property="twitter:description" content="" />
				<meta property="twitter:image" content="https://anahoward.me/images/preview.png"></meta>

				{/* <!-- Google tag (gtag.js) --> */}
				<Script
       				 src="https://www.googletagmanager.com/gtag/js?id=G-HERRG7L4LP"
        				strategy="afterInteractive"
      			/>
      			<Script id="google-analytics" strategy="afterInteractive">
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){window.dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-HERRG7L4LP');
				`}
			</Script>
			</Head>
			<body className="bg-white dark:bg-black">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

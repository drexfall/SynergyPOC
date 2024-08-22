import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import dashboard from '../public/dashboard.jpg'
import Image from 'next/image'
import Layout from '../components/layout/homeLayout';

export default function Home() {
	return (
		<Layout>
		<div className={styles.container}>
			<Head>
				<title>Synergy Platform</title>
				<link rel="icon"
				      href="/favicon.ico" />
			</Head>
			<Image
				src={dashboard}
				alt="Logo"
				className="w-full h-full"
			/>

				{/*<div className={"flex gap-4"}>*/}
				{/*	<Link href='/portal/manage'>*/}
				{/*		<button className={"rounded-lg bg-gray-900 p-4 hover:bg-blue-950 transition-all"}>*/}
				{/*			<h2 className={"text-2xl text-cyan-200"}>*/}
				{/*				Portals*/}
				{/*			</h2>*/}
				{/*		</button>*/}
				{/*	</Link>*/}
				{/*	<Link href='/template/manage'>*/}
				{/*		<button className={"rounded-lg bg-gray-900 p-4 hover:bg-blue-950 transition-all"}>*/}
				{/*			<h2 className={"text-2xl text-cyan-200"}>*/}
				{/*				Templates*/}
				{/*			</h2>*/}
				{/*		</button>*/}
				{/*	</Link>*/}
				{/*	/!*<Link href='/tools/editor'>*!/*/}
				{/*	/!*	<button className={"rounded-lg bg-gray-900 p-4 hover:bg-blue-950 transition-all"}>*!/*/}
				{/*	/!*		<h2 className={"text-2xl text-cyan-200"}>*!/*/}
				{/*	/!*			Open editor*!/*/}
				{/*	/!*		</h2>*!/*/}
				{/*	/!*	</button>*!/*/}
				{/*	/!*</Link>*!/*/}
				{/*</div>*/}
		</div>
		</Layout>
	);
}
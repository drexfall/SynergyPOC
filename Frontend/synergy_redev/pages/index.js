import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon"
				      href="/favicon.ico" />
			</Head>
			
			<main>
				
				<div className={"flex gap-4"}>
					<Link href='/template/manage'>
						<button className={"rounded-lg bg-gray-900 p-4 hover:bg-blue-950 transition-all"}>
							<h2 className={"text-2xl text-cyan-200"}>
								Create Template
							</h2>
						</button>
					</Link>
					<Link href='/tools/editor'>
						<button className={"rounded-lg bg-gray-900 p-4 hover:bg-blue-950 transition-all"}>
							<h2 className={"text-2xl text-cyan-200"}>
								Open editor
							</h2>
						</button>
					</Link>
				</div>
			
			</main>
		</div>
	);
}
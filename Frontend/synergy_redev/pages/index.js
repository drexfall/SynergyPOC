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
			{/*<Image*/}
			{/*	src={dashboard}*/}
			{/*	alt="Logo"*/}
			{/*	className="w-full h-full"*/}
			{/*/>*/}


		</div>
		</Layout>
	);
}
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChainBroken} from "@fortawesome/free-solid-svg-icons";

export default function Custom404() {
	return <div className={"w-full h-dvh flex items-center justify-center"}>
		<main className="grid place-items-center p-12 rounded-md shadow bg-blue-50 dark:bg-gray-900">
			<div className="text-center">
				<p className="font-semibold text-2xl -translate-x-3"><FontAwesomeIcon className={"size-6"} icon={faChainBroken}/> 404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
				<p className="mt-6 text-base leading-7">We couldn’t find the page you’re looking for.</p>
				<p className={"mt-6 mb-3 text-base text-start font-bold"}>What can you do?</p>
				
				<ul class="max-w-md space-y-1 text-gray-500 text-start list-disc list-inside dark:text-gray-400">
					<li>
						Check if the URL contains any spelling errors or invalid characters
					</li>
					<li>
						Make sure you have not clicked on a broken or expired link 
					</li>
					<li>
						If you feel the URL is correct and this is a problem from our side, please <Link className={"underline hover:underline-offset-4"} href={"/contact"}>report this</Link>
					</li>
				</ul>
				
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<button className={"secondary"}><Link href={"/"}>Go to home</Link></button>
					<button className={"primary"}
					        onClick={() => {
						        window.history.back()
					        }}>Go back
					</button>
				
				</div>
			</div>
		</main>
	</div>
}
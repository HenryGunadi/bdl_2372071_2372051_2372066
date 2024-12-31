import {NavLink} from 'react-router-dom';

function Home() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<NavLink to="/item">
				<button className="rounded-md text-white font-semibold bg-zinc-800 hover:cursor-pointer p-3">Item Page</button>
			</NavLink>
		</div>
	);
}

export default Home;

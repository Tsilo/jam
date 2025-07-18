import React, { useEffect, useState } from "react";
import AddModal from "./AddModal.jsx";
/*
import fetch from 'bare-fetch'
console.log(fetch);
*/
/*
import {promises} from 'bare-fs';

console.log(promises)*/
const videos = [
	"https://youtu.be/thABTUMpdm0?si=qFChNoBl_6BaXKCY",
	"https://youtu.be/91n_Vsh_53I?si=Oowi3vUm4myazK1G"
];

const fetchOembed = async (url) => {
	const {  fetch } = await import('bare-fetch');
	console.log('aq',fetch);
	const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
	const res = await fetch(oembedUrl);
	if (!res.ok) throw new Error("Failed to fetch oEmbed data");
	return res.json();
};

const Playlist = () => {
	const [videoData, setVideoData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		setLoading(true);

		Promise.all(
			videos.map((url) =>
				fetchOembed(url)
					.then((data) => ({
						url,
						title: data.title,
						author: data.author_name, // Used as short description
						thumbnail: data.thumbnail_url,
					}))
					.catch(() => ({
						url,
						title: "Failed to fetch",
						author: "",
						thumbnail: "",
					}))
			)
		).then((results) => {
			if (active) {
				setVideoData(results);
				setLoading(false);
			}
		});

		return () => {
			active = false;
		};
	}, []);

	return (
		<div className="h-full overflow-y-auto">
			<h2 className="text-lg font-bold flex items-center">
				Playlist
				<div className="ms-auto">
					<AddModal />
				</div>
			</h2>
			<div className="mt-4">
				{loading ? (
					<div className="text-gray-500">Loading…</div>
				) : (
					<ul className="space-y-4">
						{videoData.map((video) => (
							<li
								key={video.url}
								className="flex items-center border rounded p-2 gap-3 bg-white shadow-sm"
							>
								{video.thumbnail ? (
									<img
										src={video.thumbnail}
										alt={video.title}
										className="w-20 h-12 object-cover rounded"
									/>
								) : (
									<div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
										No Image
									</div>
								)}
								<div className="flex-1">
									<div className="font-medium">{video.title}</div>
									<div className="text-xs text-gray-500 truncate">
										{video.author}
									</div>
									<a
										href={video.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 text-xs underline"
									>
										Watch on YouTube
									</a>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Playlist;
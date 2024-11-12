"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { getFiles } from "@/lib/actions/file.actions";

import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";
import { Input } from "./ui/input";

export default function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const searchQuery = searchParams.get("query") || "";

	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [result, setResult] = useState<Models.Document[]>([]);
	const [debounceQuery] = useDebounce(query, 600);

	useEffect(() => {
		const fetchFile = async () => {
			if (debounceQuery.length === 0) {
				setResult([]);
				setOpen(false);
				return router.push(pathName.replace(searchParams.toString(), ""));
			}
			const files = await getFiles({ types: [], searchText: debounceQuery });
			setResult(files.documents);
			setOpen(true);
		};

		fetchFile();
	}, [debounceQuery]);

	useEffect(() => {
		if (!searchQuery) {
			setQuery("");
		}
	}, [searchQuery]);

	const handleClickItem = (file: Models.Document) => {
		setOpen(false);
		setResult([]);

		router.push(
			`${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`,
		);
	};

	return (
		<div className="search">
			<div className="search-input-wrapper">
				<Image
					src="/assets/icons/search.svg"
					alt="Search"
					width={24}
					height={24}
				/>
				<Input
					value={query}
					placeholder="Search..."
					className="search-input"
					onChange={(e) => setQuery(e.target.value)}
				/>

				{open && (
					<ul className="search-result">
						{result.length > 0 ? (
							result.map((file) => (
								<li
									className="flex items-center justify-between"
									key={file.$id}
									onClick={() => handleClickItem(file)}
								>
									<div className="flex cursor-pointer items-center gap-4">
										<Thumbnail
											type={file.type}
											extension={file.extension}
											url={file.url}
											className="size-9 min-w-9"
										/>
										<p className="subtitle-2 line-clamp-1 text-light-100">
											{file.name}
										</p>
									</div>
									<FormattedDateTime
										date={file.$createdAt}
										className="caption line-clamp-1 text-light-200"
									/>
								</li>
							))
						) : (
							<p className="empty-result">No files found</p>
						)}
					</ul>
				)}
			</div>
		</div>
	);
}

"use client";
import { usePathname, useRouter } from "next/navigation";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";

export default function Sort() {
	const router = useRouter();
	const pathName = usePathname();
	const handleSort = (value: string) => {
		router.push(`${pathName}?sort=${value}`);
	};
	return (
		<Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
			<SelectTrigger className="sort-select">
				<SelectValue placeholder={sortTypes[0].value} />
			</SelectTrigger>
			<SelectContent className="sort-select-content">
				{sortTypes.map((sort) => (
					<SelectItem
						key={sort.label}
						className="shad-select-item"
						value={sort.value}
					>
						{sort.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

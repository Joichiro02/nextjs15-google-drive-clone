"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navItems } from "@/constants";
import { signOutUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";

import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

interface Props {
	ownerId: string;
	accountId: string;
	fullname: string;
	avatar: string;
	email: string;
}

export default function MobileNavigation({
	ownerId,
	accountId,
	fullname,
	avatar,
	email,
}: Props) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	return (
		<header className="mobile-header">
			<Image
				src="/assets/icons/logo-full-brand.svg"
				alt="logo"
				width={120}
				height={52}
				className="h-auto"
			/>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Image
						src="/assets/icons/menu.svg"
						alt="menu"
						width={30}
						height={30}
						className="cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent className="shad-sheet h-screen px-3">
					<SheetTitle>
						<div className="header-user">
							<Image
								src={avatar}
								alt="avatar"
								width={44}
								height={44}
								className="header-user-avatar"
							/>
							<div className="sm:hidden lg:block">
								<p className="subtitle-2 capitalize">{fullname}</p>
								<p className="caption">{email}</p>
							</div>
						</div>
						<Separator className="mb-4 bg-light-200/20" />
					</SheetTitle>

					<nav className="mobile-nav">
						<ul className="mobile-nav-list">
							{navItems.map(({ url, name, icon }) => (
								<Link key={name} href={url} className="lg:w-full">
									<li
										className={cn("mobile-nav-item", {
											"shad-active": pathname === url,
										})}
									>
										<Image
											src={icon}
											alt={name}
											width={24}
											height={24}
											className={cn("nav-icon", {
												"nav-icon-active": pathname === url,
											})}
										/>
										<p>{name}</p>
									</li>
								</Link>
							))}
						</ul>
					</nav>

					<Separator className="my-5 bg-light-200/20" />

					<div className="flex flex-col justify-between gap-5 pb-5">
						<FileUploader />
						<Button
							type="submit"
							className="mobile-sign-out-button"
							onClick={async () => await signOutUser()} // this is implemented like this, because this component is cliet side, their a server side implementaion in signout in Header component
						>
							<Image
								src="assets/icons/logout.svg"
								alt="logout"
								width={24}
								height={24}
							/>
							<p>Logout</p>
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
}

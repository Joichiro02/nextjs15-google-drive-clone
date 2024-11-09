"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";

const getUserByEmail = async (email: string) => {
	const { databases } = await createAdminClient();

	const result = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.userCollectionId,
		[Query.equal("email", [email])],
	);

	return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
	console.error(error, message);
	throw error;
};

const sendEmailOTP = async (email: string) => {
	const { account } = await createAdminClient();

	try {
		const session = await account.createEmailToken(ID.unique(), email);
		return session.userId;
	} catch (error) {
		handleError(error, "Failed to send email OTP");
	}
};

export const createAccount = async ({
	fullname,
	email,
}: {
	fullname: string;
	email: string;
}) => {
	const existingUser = await getUserByEmail(email);

	const accountId = await sendEmailOTP(email);

	if (!accountId) throw new Error("Failed to send an OTP");

	if (existingUser) {
		const { databases } = await createAdminClient();
		await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				fullname,
				email,
				avatar:
					"https://toppng.com/public/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png",
				accountId,
			},
		);
	}
	return parseStringify({ accountId });
};

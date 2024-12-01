import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2pS5heCTQ5YvLct2d6ahF6srkci",
];

export const getEsAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}
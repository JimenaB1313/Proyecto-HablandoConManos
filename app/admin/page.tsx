import { getEsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AppWrapper from "./AppWrapper";

const AdminPage = async () => {
    const esAdmin = await getEsAdmin();

    if (!esAdmin) {
        redirect("/");
    }

    return (
        <div>
            <AppWrapper />
        </div>
    );
};

export default AdminPage;

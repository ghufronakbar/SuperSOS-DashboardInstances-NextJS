import Head from "next/head"
import { useContext } from "react";
import { AuthContext } from "@/lib/authorization";


export const HeadAdmin = () => {
 const userData = useContext(AuthContext);
        return (
            <Head>
                <title> {userData && userData.rows[0].instances_name} - SuperSOS</title>
                <meta name="admin page" content="admin page for konek app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/SuperSOS.png" />
            </Head>
        )
    
}
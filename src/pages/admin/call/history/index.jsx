import { Container, Heading } from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { TableCallHistory } from "@/components/table/TableCallHistory";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { withAuth } from "@/lib/authorization";
import { useContext } from "react";
import { AuthContext } from "@/lib/authorization";

function CallHistory() {
  const userData = useContext(AuthContext);
  return (
    <>
      <HeadAdmin />
      <NavbarAdmin />
      <main>
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Riwayat Panggilan Darurat Terjawab{" "}
            {userData && userData.rows[0].instances_name} 
          </Heading>
          <TableCallHistory />
        </Container>
      </main>
    </>
  );
}

export default withAuth(CallHistory);

import { Container, Heading } from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { TableCallPending } from "@/components/table/TableCallPending";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { withAuth } from "@/lib/authorization";
import { useContext } from "react";
import { AuthContext } from "@/lib/authorization";

function CallPending() {
  const userData = useContext(AuthContext);
  return (
    <>
      <HeadAdmin />
      <NavbarAdmin />
      <main>
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Calls{" "}
            {userData && userData.rows[0].type == 1
              ? "Rumah Sakit"
              : userData && userData.rows[0].type == 2
              ? "Polisi"
              : userData && userData.rows[0].type == 3
              ? "Pemadam Kebakaran"
              : ""} Pending
          </Heading>
          <TableCallPending />
        </Container>
      </main>
    </>
  );
}

export default withAuth(CallPending);

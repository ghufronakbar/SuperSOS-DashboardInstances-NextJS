import { Container, Heading } from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { withAuth } from "@/lib/authorization";
import { useContext } from "react";
import { AuthContext } from "@/lib/authorization";
import { DetailProfile } from "@/components/detail/DetailProfile";

function Profile() {
  const userData = useContext(AuthContext);
  return (
    <>
      <HeadAdmin />
      <NavbarAdmin />
      <main>
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
         Edit Profil
          </Heading>
          <DetailProfile />
        </Container>
      </main>
    </>
  );
}

export default withAuth(Profile);


import { Container } from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { DetailCall } from "@/components/detail/DetailCall";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { useContext } from "react";
import { AuthContext } from "@/lib/authorization";



export default function CallID() {
  const userData = useContext(AuthContext);
  return (
    <>
      <HeadAdmin/>
      <NavbarAdmin/>
      <main>        
        <Container maxW="80%"><DetailCall/></Container>
      </main>
    </>
  );
}

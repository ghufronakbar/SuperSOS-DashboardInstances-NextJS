
import { Container } from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { DetailCall } from "@/components/detail/DetailCall";
import { NavbarAdmin } from "@/components/NavbarAdmin";



export default function CallID() {
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

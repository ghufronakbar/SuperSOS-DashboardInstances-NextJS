import { Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Heading>Page 404 - Not Found</Heading>
      <Image
      src='/404.jpg'
      width={500}
      alt=""
      height={500}/>      
      <Text marginTop="4">
        Return to{" "}
        <Text
          as="span"
          color="blue"
          cursor="pointer"
          onClick={() => {
            router.push(`/admin/call`);
          }}
        >
          Dashboard
        </Text>
      </Text>
    </Flex>
  );
}

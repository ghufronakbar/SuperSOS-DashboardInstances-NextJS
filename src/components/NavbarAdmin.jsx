import {
  Flex,
  Spacer,
  Box,
  Link as ChakraLink,
  Button,
  Select,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { List, Nav } from "reactstrap";
import { axiosInstance } from "../lib/axios";
import { useContext } from "react";
import { AuthContext } from "@/lib/authorization";
import { Loading } from "./Loading";
import { jwtDecode } from "jwt-decode";

export function NavbarAdmin() {
  const router = useRouter();
  const userData = useContext(AuthContext);
  const id_instances = userData && userData.rows[0].id_instances;
  const [instancesName, setInstancesName] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axiosInstance.get(
          `/profile/${id_instances}`
        );
        setNav(profileResponse.data.values[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching detail request data:", error);
      }
    };

    if (id_instances) {
      fetchData();
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  // if(loading)return(<><Loading/></>)

  return (
    <Flex p={1} bg="#4FD1C5" color="white" padding="3">
      <Box>
        <Box
          as="button"
          p={2}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          ml={8}
          flex={2}
          onClick={() => {
            router.push(`/admin/profile`);
          }}
        >
          <Text as="b">
            {" "}
            {nav
              ? `${nav.instances_name} -  SUPERSOS ADMIN`
              : `Detail Panggilan`}
          </Text>
        </Box>
      </Box>
      <Spacer />
      <Box>
        <Box>
          <Nav horizontal>
            <UnorderedList
              style={{
                display: "flex",
                listStyleType: "none",
                gap: "20px",
                margin: 0,
                padding: 0,
              }}
            >
              <List>
                <Button
                  colorScheme="white"
                  variant="ghost"
                  onClick={() => {
                    router.push(`/admin/call`);
                  }}
                >
                  Call
                </Button>
              </List>
              <List>
                <Button
                  colorScheme="white"
                  variant="ghost"
                  onClick={() => {
                    router.push(`/admin/call/pending`);
                  }}
                >
                  Pending Call
                </Button>
              </List>
              <List>
                <Button
                  colorScheme="white"
                  variant="ghost"
                  onClick={() => {
                    router.push(`/admin/call/history`);
                  }}
                >
                  History
                </Button>
              </List>

              <Box
                as="button"
                p={2}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                mr={8}
                flex={2}
                onClick={() => {
                  handleLogout();
                }}
              >
                <Text as="b">Logout</Text>
              </Box>
            </UnorderedList>
          </Nav>
        </Box>
      </Box>
    </Flex>
  );
}

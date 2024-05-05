import {
  Box,
  Center,
  Table,
  Flex,
  Text,
  Spacer,
  Tbody,
  Tr,
  TableContainer,
  Th,
  Td,
  Image,
  VStack,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function DetailCall() {
  const router = useRouter();
  const { id: id_call } = router.query;
  const [item, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqDataResponse = await axiosInstance.get(`/call/${id_call}`);
        setRequestData(reqDataResponse.data.values[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching detail request data:", error);
      }
    };

    if (id_call) {
      fetchData();
    }
  }, [id_call]);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {item && (
        <Box>
          <Flex justifyContent="center">
            <Box flex={4} mt={4}>
              <Flex>
                <VStack>
                  {" "}
                  <Box
                    width={500}
                    p={8}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    m={4}
                  >
                    <Center>
                      {item.user.map((user) => (
                        <>
                          {" "}
                          <Image
                            borderRadius="18"
                            boxSize="120px"
                            objectFit="cover"
                            src={user.picture}
                            alt={user.picture}
                          />
                        </>
                      ))}
                    </Center>
                    <Box mt={5}>
                      <TableContainer>
                        <Table>
                          {item.user.map((user) => (
                            <Tbody>
                              <Tr>
                                <Th>Name</Th>
                                <Td>{user.fullname}</Td>
                              </Tr>
                              <Tr>
                                <Th>Email</Th>
                                <Td>{user.email}</Td>
                              </Tr>
                              <Tr>
                                <Th>Phone</Th>
                                <Td>{user.phone}</Td>
                              </Tr>
                              <Tr>
                                <Th>Address</Th>
                                <Td>{user.address}</Td>
                              </Tr>

                              <Tr>
                                <Th>Applied At</Th>
                                <Td>
                                  <Text>{formatDate(item.applied_at)}</Text>
                                </Td>
                              </Tr>
                            </Tbody>
                          ))}
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                  <Box
                    width={500}
                    p={8}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    m={4}
                  >
                    <Box mt={4}>
                      <TableContainer>
                        <Table>
                          {item.instances.length ? (
                            item.instances.map((instance) => (
                              <Tbody key={instance.id}>
                                <Tr>
                                  <Th>Name</Th>
                                  <Td>{instance.instances_name}</Td>
                                </Tr>
                                <Tr>
                                  <Th>Email</Th>
                                  <Td>{instance.email}</Td>
                                </Tr>
                                <Tr>
                                  <Th>Phone</Th>
                                  <Td>{instance.phone}</Td>
                                </Tr>
                                <Tr>
                                  <Th>Address</Th>
                                  <Td>{instance.address}</Td>
                                </Tr>
                                <Tr>
                                  <Th>Answered At</Th>
                                  <Td>{formatDate(item.answered_at)}</Td>
                                </Tr>
                              </Tbody>
                            ))
                          ) : (
                            <Tbody>
                              <Tr>
                                <Td colSpan="2" textAlign="center">
                                  <Box
                                    as="button"
                                    borderRadius="md"
                                    bg="#E53E3E"
                                    color="white"
                                    p={2}
                                    m={2}
                                    px={4}
                                  >
                                    Hasn't Answered
                                  </Box>
                                </Td>
                              </Tr>
                            </Tbody>
                          )}
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </VStack>
                <Box
                  flex={4}
                  p={8}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  m={4}
                  maxW={1000}
                >
                  <Box mt={4}>
                    <TableContainer>
                      <Table>
                        <Tbody>
                        
                          <Tr>
                            <Th>LOCATION</Th>
                            <Td isNumeric>
                              {item.latitude}, {item.longitude}
                            </Td>
                          </Tr>
                          <Tr>
                            <Th>Type</Th>

                            <Td isNumeric>
                              {item.type == 1
                                ? "Rumah Sakit"
                                : item.type == 2
                                ? "Polisi"
                                : "Pemadam Kebakaran"}
                            </Td>
                          </Tr>

                          <Tr>
                            <Th>Status</Th>
                            <Td>
                              <Box
                                as="button"
                                borderRadius="md"
                                bg={
                                  item.status === 0
                                    ? "#CBD5E0"
                                    : item.status === 1
                                    ? "#E53E3E"
                                    : "#0063d1"
                                }
                                color="white"
                                p={2}
                                m={2}
                                px={4}
                              >
                                <VStack>
                                 
                                  <Text as="b">
                                    {item.status === 0
                                      ? "Pending"
                                      : item.status === 1
                                      ? "Cancelled by user"
                                      : "Accepted"}
                                  </Text>
                                </VStack>
                              </Box>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                    
                  </Box>
                  <Box
                  m={4}
                      mt={8}
                      p={8}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      
                    >
                      <Table mb={4}><Th as='b'>Message</Th></Table>
                      <Text px={4} style={{ overflowWrap: "break-word" }}>
                        {item.message}
                      </Text>
                    </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}

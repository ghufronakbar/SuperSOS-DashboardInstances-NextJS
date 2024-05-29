import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "@/lib/authorization";
import { formatDecimal } from "@/lib/formatDecimal";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export function TableCallHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const userData = useContext(AuthContext);
  const type = userData && userData.rows[0].type;
  const [idCall, setIdCall] = useState(null);
  const idInstances = userData && userData.rows[0].id_instances;
  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  let i = 1;
  const { data: dataCall, refetch: refetchDataCall } = useQuery({
    queryKey: ["calls/history", type],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get(
        `/calls/history/${idInstances}`
      );
      return dataResponse;
    },
  });

  const handleDetail = (id_call) => {
    router.push(`/admin/call/${id_call}`);
  };

  const handleApprove = async (id_call) => {
    try {
      await axiosInstance.put(`/call/approve/${id_call}`, {
        id_instances: idInstances,
      });
      toast({
        title: "Sukses menjawab panggilan darurat ini! segera ke lokasi!",
        status: "success",
      });
      refetchDataCall();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th></Th>
              <Th>Nama</Th>
              <Th>Lokasi</Th>
              <Th>Waktu Panggilan</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataCall?.data.values.map((item) => (
              <Tr key={item.id_call}>
                <Td>{i++}</Td>
                <Td>
                  {item.user.map((user, index) => (
                    <>
                      <Image
                        borderRadius="18"
                        boxSize="60px"
                        objectFit="cover"
                        src={user.picture}
                        alt={user.picture}
                      />
                    </>
                  ))}
                </Td>
                <Td>
                  <Text as="b">
                    {item.user.map((user) => (
                      <>{user.fullname}</>
                    ))}
                  </Text>
                </Td>
                <Td>
                  <HStack>
                    <Text>{formatDecimal(item.latitude)}, </Text>
                    <Text>{formatDecimal(item.longitude)}</Text>{" "}
                    <a href={item.url_google_map} target="_blank">
                      <ExternalLinkIcon />
                    </a>
                  </HStack>
                </Td>{" "}
                <Td>
                  <Text>{formatDate(item.applied_at)}</Text>
                </Td>
                <Td>
                  <Center>
                    <>
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
                        onClick={
                          item.status == 0
                            ? () => {
                                setIsModalOpen(true);
                                setIdCall(item.id_call);
                              }
                            : item.status == 1
                            ? () => {
                                toast({
                                  title:
                                    "Panggilan darurat sudah dibatalkan oleh pemanggil",
                                  status: "warning",
                                });
                              }
                            : item.status == 2
                            ? () => {
                                toast({
                                  title: "Panggilan darurat ini sudah terjawab",
                                  status: "warning",
                                });
                              }
                            : () => {}
                        }
                      >
                        <VStack>
                          <Text as="b">
                            {item.status === 0
                              ? "Menunggu"
                              : item.status === 1
                              ? "Dibatalkan"
                              : "Diterima oleh "}
                            {item.instances.map((instance) => (
                              <>{instance.instances_name}</>
                            ))}
                          </Text>
                          {item.status === 0 ? (
                            ""
                          ) : item.status == 1 ? (
                            <Text>Dibatalkan oleh pemanggil</Text>
                          ) : (
                            <Text>{formatDate(item.answered_at)}</Text>
                          )}
                        </VStack>
                      </Box>
                    </>
                  </Center>
                </Td>
                <Td>
                  <Center>
                    <Button
                      variant="outline"
                      colorScheme="grey"
                      onClick={() => handleDetail(item.id_call)}
                    >
                      <Text as="b">Detail</Text>
                    </Button>
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Jawab panggilan darurat ini?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Spacer />

              <Button
                mt={8}
                borderRadius="md"
                bg="#CBD5E0"
                color="white"
                px={4}
                h={8}
                type="submit"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Tutup
              </Button>
              <Spacer />
              <Button
                mt={8}
                borderRadius="md"
                bg="#48BB78"
                color="white"
                px={4}
                h={8}
                onClick={() => {
                  handleApprove(idCall);
                }}
              >
                Jawab
              </Button>

              <Spacer />
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

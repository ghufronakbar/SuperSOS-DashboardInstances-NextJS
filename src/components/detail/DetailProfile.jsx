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
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/lib/authorization";
import { useQuery } from "@tanstack/react-query";

export function DetailProfile() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instancesName, setInstancesName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmationPassword, setConfirmationPassword] = useState();
  const userData = useContext(AuthContext);
  const id_instances = userData && userData.rows[0].id_instances;

  const { data: dataProfile, refetch: refetchDataProfile } = useQuery({
    queryKey: ["profile", id_instances],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get(`/profile/${id_instances}`);
      setLoading(false);
      return dataResponse;
    },
  });

  useEffect(() => {
    if (dataProfile) {
      setInstancesName(dataProfile.data.values[0].instances_name);
      setAddress(dataProfile.data.values[0].address);
      setPhone(dataProfile.data.values[0].phone);
      setEmail(dataProfile.data.values[0].email);
    }
  }, [dataProfile]);

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/profile/edit/${id_instances}`, {
        instances_name: instancesName,
        address: address,
        phone: phone,
        email: email,
      });
      toast({
        title: "Successfully update profile",
        status: "success",
      });
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handlePassword = async () => {
    try {
      if (newPassword == confirmationPassword) {
        await axiosInstance.put(`/profile/edit/password/${id_instances}`, {
          old_password: oldPassword,
          new_password: newPassword,
        });
        toast({
          title: "Successfully change password",
          status: "success",
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmationPassword("");
      }else{
        toast({
            title: "Confirmation password doesn't match",
            status: "error",
          });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast({
          title: "Old password doesn't match",
          status: "error",
        });
      } else {
        console.error("Error rejecting request:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {dataProfile?.data.values.map((item) => (
        <>
          <Flex justifyContent="center">
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              flex={2}
            >
              <form>
                <FormControl my={6}>
                  <FormLabel>Instances Name</FormLabel>
                  <Input
                    value={instancesName}
                    onChange={(e) => setInstancesName(e.target.value)}
                  ></Input>
                </FormControl>
                <FormControl my={6}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Input>
                </FormControl>
                <FormControl my={6}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Input>
                </FormControl>
                <FormControl my={6}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Input>
                </FormControl>
                <VStack>
                  <Button
                    onClick={() => {
                      handleUpdate();
                    }}
                  >
                    Update
                  </Button>
                </VStack>
              </form>
            </Box>
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              flex={1}
            >
              <form>
                <FormControl my={6}>
                  <FormLabel>Old Password</FormLabel>
                  <Input
                  type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  ></Input>
                </FormControl>
                <FormControl my={6}>
                  <FormLabel>New Password</FormLabel>
                  <Input
                  type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Input>
                </FormControl>
                <FormControl my={6}>
                  <FormLabel>Confirmation Password</FormLabel>
                  <Input
                  type="password"
                    value={confirmationPassword}
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                  ></Input>
                </FormControl>

                <VStack>
                  <Button
                    onClick={() => {
                      handlePassword();
                    }}
                  >
                    Update
                  </Button>
                </VStack>
              </form>
            </Box>
          </Flex>
        </>
      ))}
    </>
  );
}

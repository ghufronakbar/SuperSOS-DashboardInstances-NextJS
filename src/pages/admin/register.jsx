import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { useRouter } from "next/router";

function Register() {
  const [instancesName, setInstancesName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [type, setType] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/register", {
        instances_name: instancesName,
        address: address,
        email: email,
        phone: phone,
        password: password,
        confirmation_password: confirmationPassword,
        type: type,
      });

      const { status, message } = response.data;

      if (status === 200) {
        toast({
          title: "Registrasi Berhasil",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        router.push("/admin/login");
      } else {
        toast({
          title: "Registrasi Gagal",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal melakukan registrasi. Silakan coba lagi.";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {HeadAdmin()}
      <main>
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Heading>Registrasi Admin Instansi</Heading>
          <form onSubmit={handleRegister}>
            <FormControl mt={4}>
              <FormLabel>Nama Instansi</FormLabel>
              <Input
                type="text"
                value={instancesName}
                onChange={(e) => setInstancesName(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Alamat</FormLabel>
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Telepon</FormLabel>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Konfirmasi Password</FormLabel>
              <Input
                type="password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tipe</FormLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Pilih Tipe"
                required
              >
                <option value="1">Rumah Sakit</option>
                <option value="2">Polisi</option>
                <option value="3">Pemadam Kebakaran</option>
              </Select>
            </FormControl>

            <Button mt={6} type="submit">
              Registrasi
            </Button>
          </form>
          <Text mt={4}>
            Sudah punya akun?{" "}
            <Text color="blue" cursor="pointer" onClick={() => router.push(`/admin/login`)}>
              Masuk
            </Text>
          </Text>
        </Container>
      </main>
    </>
  );
}

export default Register;

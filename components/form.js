import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
  Stack,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/core";

const Form = () => {
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        process.env.API_URL,
        {
          fname,
          lname,
          phone,
        },
        { headers: { "Content-Type": null } }
      )
      .then(() => {
        window.localStorage.setItem("codysbirthday", "true");
        setSubmitted(true);
      })
      .catch((e) => {
        toast({
          title: "Submit failed",
          description: `An error occurred: ${e.message}`,
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form onSubmit={handleSubmit} method="post">
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="fname">First name</FormLabel>
          <Input
            id="fname"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="lname">Last name</FormLabel>
          <Input
            id="lname"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="phone">Mobile number</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={<Icon name="phone" color="gray.300" />}
            />
            <Input
              id="phone"
              type="phone"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" variantColor="red" isDisabled={loading}>
          {loading ? <Spinner color="white" /> : <Text>Count Me In</Text>}
        </Button>
      </Stack>
    </form>
  );
};

export { Form };

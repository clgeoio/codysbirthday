import React, { useState, Fragment } from "react";
import axios from "axios";
import Head from "next/head";
import { Flex, Textarea, Box, Button, Spinner, Heading } from "@chakra-ui/core";

export async function getServerSideProps({ query }) {
  if (query.pass !== process.env.PASS) {
    return {
      props: {},
    };
  }
  return {
    props: {
      twilApiUrl: process.env.TWIL_API_URL,
    },
  };
}

export default function Twil({ twilApiUrl }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (message) {
      setLoading(true);
      try {
        await axios.post(
          twilApiUrl,
          { body: message },
          {
            headers: {
              accept: "application/json",
            },
          }
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setMessage("");
      }
    }
  };
  if (!twilApiUrl) {
    return null;
  }

  return (
    <Fragment>
      <Head>
        <title>Secret</title>
      </Head>
      <main>
        <Flex align="center" justify="center" flexDirection="column">
          <Box maxW="xl">
            <Heading marginBottom="2rem">Input message:</Heading>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              size="xl"
            ></Textarea>
            <Button
              marginTop="1rem"
              onClick={handleClick}
              type="button"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Send"}
            </Button>
          </Box>
        </Flex>
      </main>
    </Fragment>
  );
}

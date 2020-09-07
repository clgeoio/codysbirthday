import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { Flex, Heading, Box, Text, Divider } from "@chakra-ui/core";
import { Form } from "../components/form";

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
  };
}

export async function getStaticProps() {
  return {
    props: {
      apiUrl: process.env.API_URL,
    },
  };
}

export default function Home({ apiUrl }) {
  const remaining = getTimeRemaining(new Date(2020, 10, 3));
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setSubmitted(
      Boolean(window && window.localStorage.getItem("codysbirthday"))
    );
  }, []);

  return (
    <Box
      backgroundImage="url('/bg.png')"
      height="100vh"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Head>
        <title>Cody's Birthday</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex align="center" justify="center" flexDirection="column">
          <Box
            maxW="xl"
            borderWidth="1px"
            rounded="lg"
            marginTop="2rem"
            backgroundColor="white"
          >
            <Box p="6">
              <Box>
                <Heading textAlign="center" size="2xl">
                  Cody's Birthday
                </Heading>
              </Box>

              <Box marginTop="2rem" p="2" textAlign="center">
                <Text>My birthday is fast approaching!</Text>
                <Text>
                  only{" "}
                  <Text as="span" fontWeight="bold" color="red.400">
                    {remaining.days}
                  </Text>{" "}
                  days away
                </Text>
              </Box>
              <Box marginTop="2rem" marginBottom="2rem">
                <Text>
                  It would be truly wonderful to have you attend a gathering
                  with friends, old and new. I have created this small form for
                  you to put your contact details in and you will be notified
                  via SMS of the event.
                </Text>
              </Box>
              <Divider borderColor="red.400" />

              <Box marginTop="2rem">
                {submitted ? (
                  <Fragment>
                    <Text textAlign="center">🎉 You're all set 🎉</Text>
                    <Text textAlign="center">
                      You will recieve an SMS closer to the date
                    </Text>
                  </Fragment>
                ) : (
                  <Form apiUrl={apiUrl} setSubmitted={setSubmitted} />
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </main>
    </Box>
  );
}

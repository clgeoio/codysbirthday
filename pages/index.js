import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { Flex, Heading, Box, Text, Divider } from "@chakra-ui/core";
import { Form } from "../components/form";

function getTimeRemaining(theDay) {
  const total = theDay.getTime() - Date.now();
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
  const theDay = new Date(
    `Oct 03 ${new Date().getFullYear()} 00:00:00 GMT+1000 (Australian Eastern Standard Time)`
  );
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][theDay.getDay()];
  const remaining = getTimeRemaining(theDay);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setSubmitted(
      Boolean(window && window.localStorage.getItem("codysbirthday"))
    );
  }, []);

  return (
    <Box
      backgroundImage="url('dog.jpg')"
      height={["1000px", "1000px", "1000px", "1600px"]}
      backgroundSize="cover"
      backgroundPosition="50% 70%"
    >
      <Head>
        <title>Cody's Birthday</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Cody's Birthday" />
        <meta property="og:site_name" content="Cody's Birthday" />
        <meta property="og:url" content="https://codysbirthday.com/" />
        <meta
          property="og:description"
          content="It's my birthday soon and I'd like you to be a part of it."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codysbirthday.com/og.jpg" />
      </Head>
      <main>
        <Flex align="center" justify="center" flexDirection="column">
          <Box marginTop="2rem">
            <Heading textAlign="center" size="2xl">
              Cody's Birthday!
            </Heading>
          </Box>

          <Box maxW="xl" marginTop="0.2rem">
            <Box p="6">
              <Box p="2" textAlign="center">
                <Text>My birthday is fast approaching!</Text>
                <Text>
                  Only{" "}
                  <Text as="span" fontWeight="bold" color="red.400">
                    {remaining.days + 1}
                  </Text>{" "}
                  days away
                </Text>
              </Box>
              <Box marginTop="2rem" marginBottom="2rem">
                <Text>
                  Information has been sent out. Check your messages, see you
                  soon!
                </Text>
              </Box>
              <Divider borderColor="red.400" />
            </Box>
          </Box>
        </Flex>
      </main>
    </Box>
  );
}

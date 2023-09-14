import {
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react";

export default function Home() {
  const { handleLogOut, user, isAuthenticated, setShowAuthFlow } =
    useDynamicContext();

  return (
    <>
      <Head>
        <title>Co:Create x Dynamic</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main>
        <VStack spacing={5} mt={50}>
          <Center>
            <Text fontSize='2xl'>
              <Link
                target='_blank'
                textDecoration='underline'
                href='https://usecocreate.io'
              >
                Co:Create
              </Link>{" "}
              x{" "}
              <Link
                target='_blank'
                textDecoration='underline'
                href='https://dynamic.xyz'
              >
                Dynamic
              </Link>{" "}
              Demo
            </Text>
          </Center>
          <Text>
            This is a demo of using{" "}
            <Link
              target='_blank'
              textDecoration='underline'
              href='https://dynamic.xyz'
            >
              Dynamic
            </Link>{" "}
            for authentication and{" "}
            <Link
              target='_blank'
              textDecoration='underline'
              href='https://usecocreate.io'
            >
              Co:Create
            </Link>{" "}
            for Wallet Generation
          </Text>
          {!isAuthenticated && (
            <Text mt={5}>Get Started by logging in with your email 👇</Text>
          )}
          {!isAuthenticated && (
            <Button colorScheme='purple' onClick={() => setShowAuthFlow(true)}>
              Sign Up or Sign In
            </Button>
          )}
          {user && (
            <HStack>
              <Text>You have connected as {user.email} </Text>
              <Button variant='link' colorScheme='red' onClick={handleLogOut}>
                Log Out
              </Button>
            </HStack>
          )}
        </VStack>
      </main>
    </>
  );
}

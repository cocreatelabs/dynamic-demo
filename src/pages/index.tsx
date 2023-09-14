import { Button, Center, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [coCreateWalletCreated, setCoCreateWalletCreated] = useState(false);
  const [coCreateWalletAddress, setCoCreateWalletAddress] = useState("");
  const [coCreateWalletCreating, setCoCreateWalletCreating] = useState(false);
  const [coCreateWalletLoading, setCoCreateWalletLoading] = useState(false);

  const { authToken, handleLogOut, user, isAuthenticated, setShowAuthFlow } =
    useDynamicContext();

  const logout = async () => {
    setCoCreateWalletCreated(false);
    setCoCreateWalletAddress("");
    await handleLogOut();
  };

  useEffect(() => {
    const getUser = async () => {
      setCoCreateWalletLoading(true);
      try {
        const response = await axios.get("/api/get_user", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.status === 200) {
          setCoCreateWalletAddress(response.data.data.cocreate_wallet_address);
          setCoCreateWalletCreated(true);
        }
      } catch (error) {
        // @ts-expect-error - error is not typed
        if (error.response.status === 404) {
          console.log("User not found");
        } else {
          console.error(error);
        }
      }
      setCoCreateWalletLoading(false);
    };

    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated, authToken]);

  const onClickCreateCoCreateWallet = async () => {
    setCoCreateWalletCreating(true);
    try {
      const response = await axios.post(
        "/api/create_user",
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.status === 200) {
        setCoCreateWalletAddress(response.data.data.cocreate_wallet_address);
        setCoCreateWalletCreated(true);
      }
    } catch (error) {
      console.error(error);
    }
    setCoCreateWalletCreating(false);
  };

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
            <>
              <HStack>
                <Text>You have connected as {user.email} </Text>
                <Button variant='link' colorScheme='red' onClick={logout}>
                  Log Out
                </Button>
              </HStack>
              ((coCreateWalletCreating || coCreateWalletLoading) ?{" "}
              <Text>Loading</Text> : (
              {coCreateWalletCreated || (
                <Text>
                  You can now use the Co:Create API to create a user wallet 👇
                </Text>
              )}
              {coCreateWalletCreated ? (
                <Text>
                  Your Co:Create wallet address is: {coCreateWalletAddress}
                </Text>
              ) : (
                <Button
                  isLoading={coCreateWalletCreating}
                  loadingText='Creating'
                  onClick={onClickCreateCoCreateWallet}
                  colorScheme='purple'
                >
                  Create Co:Create Wallet
                </Button>
              )}
              ))
            </>
          )}
        </VStack>
      </main>
    </>
  );
}

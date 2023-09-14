import { useState, useEffect } from "react";
import { Button, Text, Input, Box, Flex } from "@chakra-ui/react";
import { FaTiktok } from "react-icons/fa";

const ConnectTikTok = () => {
  const [tiktokUsername, setTiktokUsername] = useState<null | string>(null);
  const [isInputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    const storedTiktokUsername = localStorage.getItem("tiktok_username");
    if (storedTiktokUsername) {
      setTiktokUsername(storedTiktokUsername);
    }
  }, []);

  const handleConnectClick = () => {
    setInputVisible(true);
  };

  const handleCancelClick = () => {
    setInputVisible(false);
  };

  const disconnectTikTok = () => {
    localStorage.removeItem("tiktok_username");
    setTiktokUsername(null);
  };

  return (
    <Box>
      {tiktokUsername ? (
        <>
          <Text as='span' fontSize='l'>
            Successfully connected TikTok Account:{" "}
            <Text as='span' fontWeight='bold'>
              {tiktokUsername}.
            </Text>
          </Text>
          <Button
            onClick={disconnectTikTok}
            colorScheme='red'
            variant='link'
            textDecoration={"underline"}
          >
            Disconnect
          </Button>
        </>
      ) : isInputVisible ? (
        <Flex>
          <Input
            placeholder='Enter TikTok username'
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const newUsername = (e.target as HTMLInputElement).value;
                localStorage.setItem("tiktok_username", newUsername);
                setTiktokUsername(newUsername);
                setInputVisible(false);
              }
            }}
          />
          <Button onClick={handleCancelClick} colorScheme='red' marginLeft={2}>
            Cancel
          </Button>
        </Flex>
      ) : (
        <Button
          onClick={handleConnectClick}
          leftIcon={<FaTiktok />}
          bgColor='black'
          color='white'
          _hover={{ bgColor: "gray.700" }}
        >
          Manual TikTok Account Connect
        </Button>
      )}
    </Box>
  );
};

export default ConnectTikTok;

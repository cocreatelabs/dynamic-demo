import { Button, Text } from "@chakra-ui/react";
import React from "react";

interface SocialButtonProps {
  username: string | null;
  connectAction: () => void;
  disconnectAction: () => void;
  icon: React.ReactElement;
  colorScheme: string;
  serviceName: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  username,
  connectAction,
  disconnectAction,
  icon,
  colorScheme,
  serviceName,
}) => {
  return (
    <>
      {username ? (
        <Text as='span' fontSize='l'>
          Successfully connected {serviceName} Account:{" "}
          <Text as='span' fontWeight='bold'>
            {username}.
          </Text>
          {"   "}
          <Button
            onClick={disconnectAction}
            colorScheme='red'
            variant='link'
            textDecoration={"underline"}
          >
            Disconnect
          </Button>
        </Text>
      ) : (
        <Button
          onClick={connectAction}
          leftIcon={icon}
          colorScheme={colorScheme}
        >
          Connect Your {serviceName} Account
        </Button>
      )}
    </>
  );
};

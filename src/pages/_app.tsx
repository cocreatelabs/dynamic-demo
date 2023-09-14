import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "05e15542-756d-4376-999c-4389e442f9b5",
        eventsCallbacks: {
          onAuthSuccess: async (args) => {
            console.log("onAuthSuccess was called", args);
          },
        },
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DynamicContextProvider>
  );
}

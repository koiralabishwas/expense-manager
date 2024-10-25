import React from "react";
import { Button } from "@/components/ui/button";
import { Box, Heading, Flex } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box backgroundColor={"green.600"} padding={1} borderBottomColor={"white"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        {/* Empty Box to help center the Heading */}
        <Box flex="1">
        </Box>
        <Heading fontSize={"xl"} textAlign={"center"} >
          出費管理
        </Heading>

        {/* Centered Heading */}

        {/* Button part aligned to the right */}
        <Box flex="1" display="flex" justifyContent="flex-end">
          <Button
            paddingX={4}
            color={"white"}
            variant={"plain"}
            backgroundColor={"blue.600"}
            _hover={{ backgroundColor: "blue.700" }}
          >
            Log IN
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;

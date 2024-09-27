import React from "react";
import { Box, Button, Flex, Image, Link, Spacer} from "@chakra-ui/react";
import Facebook from "./assets/facebook.png";
import Twitter from "./assets/twitter.png";
import Email from "./assets/email.png"



const NavBar = ({accounts, setAccounts}) => {
    const isconnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts); // Update the accounts state
        }  else {
            alert("Please install MetaMask!");
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">
           {/*left side of the navbar*/} 
           <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.facebook.com" isExternal>
                    <Image src={Facebook} boxSize="42px" margin="0 15px" />
                </Link>

                <Link href="https://www.twitter.com" isExternal>
                    <Image src={Twitter} boxSize="42px" margin="0 15px" />
                </Link>

                <Link href="https://www.gmail.com" isExternal>
                    <Image src={Email} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>

            
           

          {/*right side section */}
          <Flex
             justify="space-around"
             align="center"
             width="40%"
             padding="30px"
             >

          <Box margin="0 15px">About</Box>
          <Spacer/>
          <Box margin="0 15px">Mint</Box>
          <Spacer/>
          <Box margin="0 15px">Team</Box>
          <Spacer/>

          {/*connect button */}
          {isconnected ?(
            <Box margin="0 15px">Connected</Box>
          ) : (
            <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}>
                Connect</Button>
          )}
          </Flex>

        </Flex>
    );
};

export default NavBar;
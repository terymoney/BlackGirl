import { useState } from "react";
import { ethers } from 'ethers'; // Importing ethers
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import BlackGirlABI from "./BlackGirlABI.json";

const BlackGirlAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const MainMint = ({ accounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    BlackGirlAddress,
                    BlackGirlABI.abi,
                    signer
                );
    
                let mintPrice;
                let mintFunction;
    
                // Attempt to check if the user is on the allowlist
                let isAllowlisted = false;
                try {
                    isAllowlisted = await contract.allowList(accounts[0]);
                } catch (error) {
                    console.error("Failed to check allowlist:", error);
                }
    
                if (isAllowlisted) {
                    // If user is on the allowlist, set allowlist mint parameters
                    mintPrice = 0.0001; // Allowlist mint price
                    mintFunction = contract.allowlistMint;
                } else {
                    // Otherwise, fall back to public minting
                    mintPrice = 0.001; // Public mint price
                    mintFunction = contract.publicMint;
                }
    
                const amountInEther = ethers.parseEther((mintPrice * mintAmount).toString());
    
                // Call the appropriate mint function
                const response = await mintFunction(mintAmount, {
                    value: amountInEther,
                });
    
                console.log("Mint response:", response);
            } catch (err) {
                console.error("Minting failed:", err);
            }
        } else {
            console.error("Ethereum object doesn't exist!");
        }
    }
    

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">BlackGirl</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        Black Girl Power!!! Melanin sweet like chocolate. Mint BlackGirl NFT to get your own share of delicious melanin.
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            {/* Decrement button */}
                            <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleDecrement} 
                            margin="0 10px">-</Button>

                            {/* Input for mint amount */}
                            <Input
                                fontFamily="inherit"
                                type="number"
                                value={mintAmount}
                                readOnly
                                textAlign="center"
                                width="100px"
                                height="40px"
                                paddingLeft="19px"
                                marginTop="10px"
                            />

                            {/* Increment button */}
                            <Button 
                             backgroundColor="#D6517D"
                             borderRadius="5px"
                             boxShadow="0px 2px 2px 1px #0F0F0F"
                             color="white"
                             cursor="pointer"
                             fontFamily="inherit"
                             padding="15px"
                             marginTop="10px"
                             onClick={handleIncrement} 
                             margin="0 10px">+</Button>
                        </Flex>

                        {/* Mint Now Button */}
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleMint}
                        >
                            Mint Now
                        </Button>
                    </div>
                ) : (
                    <Text
                      marginTop="70px"
                      fontSize="30px"
                      letterSpacing="-5.5%"
                      fontFamily="VT323"
                      textShadow="0 3px #000000"
                      color="#D6517D"
                    >
                        You must be connected to mint.
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;

import {Box, Flex} from '@chakra-ui/react';
import Image from "next/image";
const Navbar = () => {
    return (
        <Box as="nav" bg="#0a3158" color="white" p={10}>
            <Flex align="center" justifyContent='center' flexWrap='wrap'>
                <Image src="/assets/images/nawy.svg"
                       width={300}
                       height={400}
                       alt="logo"/>
            </Flex>
        </Box>
    );
};

export default Navbar;

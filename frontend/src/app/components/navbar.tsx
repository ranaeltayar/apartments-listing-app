import {Box, Flex, Image} from '@chakra-ui/react';
const Navbar = () => {
    return (
        <Box as="nav" bg="#0a3158" color="white" p={10}>
            <Flex align="center" justifyContent='center' flexWrap='wrap'>
                <Image src="/assets/images/nawy.svg"
                       alt="logo"/>
            </Flex>
        </Box>
    );
};

export default Navbar;

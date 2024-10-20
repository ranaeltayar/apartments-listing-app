import { ChakraProvider, Box } from '@chakra-ui/react';
import Navbar from '@/app/components/navbar';

// ADD CONSTANTS FILE

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ChakraProvider>
            <Navbar />
            <Box p={10}>
                {children}
            </Box>
        </ChakraProvider>
        </body>
        </html>
    );
}

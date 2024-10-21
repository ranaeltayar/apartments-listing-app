"use client";  // Ensures this component is client-side

import { Button, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const ClientBackButton: React.FC = () => {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.back()}
            colorScheme="teal"
            variant="solid"
            size="lg"
            leftIcon={<ArrowBackIcon />}
            borderRadius="md"
            boxShadow="md"
            _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
            mb={5}
        >
            <Text fontWeight="bold">Back</Text>
        </Button>
    );
};

export default ClientBackButton;

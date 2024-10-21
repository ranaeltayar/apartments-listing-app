"use client";

import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Image,
    Spinner,
    Tag,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {formatPrice} from '@/app/helpers/currency-format';
import {IAmenity} from '@/app/responses/amenity.interface';
import {MdAttachMoney, MdBathtub, MdBedroomChild, MdCropSquare, MdLocationOn} from 'react-icons/md';
import axiosInstance from '@/app/axios/axiosInstance';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {useRouter} from 'next/navigation';
import {IUnit} from '@/app/responses/unit.interface';

const DetailsPage = ({params}: { params: { id: string } }) => {
    const [listing, setListing] = useState<IUnit>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // Error state
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        const fetchListingDetails = async () => {
            if (params.id) {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`units/${params.id}`);
                    setListing(response.data);
                } catch {
                    setError("Unable to fetch listing details. Please try again later.");
                    toast({
                        title: "Error!",
                        description: "Unable to fetch listing details. Please try again later.",
                        status: "error",
                        duration: 4000,
                        isClosable: true,
                    });
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchListingDetails();
    }, [params.id]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={10} px={6}>
                <Heading size="lg" mb={4}>Error</Heading>
                <Text fontSize="md" color="gray.600">{error}</Text>
                <Button onClick={() => router.back()} mt={4} colorScheme="teal">Go Back</Button>
            </Box>
        );
    }

    if (!listing) {
        return (
            <Box textAlign="center" py={10} px={6}>
                <Heading size="lg" mb={4}>No Listing Details Found</Heading>
                <Text fontSize="md" color="gray.600">We couldn&apos;t find any listing details.
                    Please try again later.</Text>
                <Button onClick={() => router.back()} mt={4} colorScheme="teal">Go Back</Button>
            </Box>
        );
    }

    const settings = {
        dots: true,
        infinite: listing.imageUrls.length > 1,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Button
                onClick={() => router.back()}
                colorScheme="teal"
                variant="solid"
                size="lg"
                leftIcon={<ArrowBackIcon/>}
                borderRadius="md"
                boxShadow="md"
                _hover={{boxShadow: "lg", transform: "scale(1.05)"}}
                mb={5}
            >
                <Text fontWeight="bold">Back</Text>
            </Button>
            <Box p={20} boxShadow={"5px 4px 15px 1px rgba(0,0,0,0.2)"} borderRadius="md"
                 mx="auto">
                <Heading mb={6} fontSize="2xl" fontWeight="bold">{listing.name}</Heading>

                <Box mt={10}>
                    <Slider {...settings} autoplay={true}>
                        {listing.imageUrls.map((image: string, index: number) => (
                            <Box key={index} borderRadius="lg">
                                <Image
                                    src={image}
                                    alt={`Slide ${index}`}
                                    objectFit="cover"
                                    width="100%"
                                    height="400px"
                                    display="block"
                                    borderRadius="lg"
                                    borderWidth="1px"
                                />
                            </Box>
                        ))}
                    </Slider>
                </Box>

                <VStack spacing={5} mt={6} align="start">
                    <Text fontWeight="bold" fontSize="lg">Description:</Text>
                    <Text fontSize="md" color="gray.700">{listing.description}</Text>

                    <Box>
                        <Text fontWeight="bold" fontSize="lg">Basic Info:</Text>
                        <Flex alignItems="center" mb={1}>
                            <Icon as={MdAttachMoney} color="green" mr={1}/>
                            <Text
                                fontSize="lg">{formatPrice(listing.price, listing.currency)}</Text>
                        </Flex>
                        <Flex alignItems="center" mb={1}>
                            <Icon as={MdCropSquare} mr={1}/>
                            <Text>{listing.size} m²</Text>
                        </Flex>
                        <Flex alignItems="center" mb={1}>
                            <Icon as={MdBedroomChild} mr={1}/>
                            {listing.bedrooms} Bed
                            <Icon as={MdBathtub} mr={1} ml={3}/>
                            {listing.bathrooms} Bath
                        </Flex>
                        <Flex alignItems="center">
                            <Icon as={MdLocationOn} color="rgb(204 57 0)" mr={1}/>
                            <Text>{listing.compound}</Text>
                        </Flex>
                    </Box>

                    <Box display="flex" width="100%" flexWrap="wrap" justifyContent="space-between"
                         mt={4}>
                        <Box display="flex" flexDirection="column" width="30%">
                            <Text fontWeight="bold" fontSize="lg">Property Type:</Text>
                            <Text fontSize="md">{listing.propertyType}</Text>
                        </Box>
                        <Box display="flex" flexDirection="column" width="30%">
                            <Text fontWeight="bold" fontSize="lg">Sale Type:</Text>
                            <Text fontSize="md">{listing.saleType}</Text>
                        </Box>
                        <Box display="flex" flexDirection="column" width="30%">
                            <Text fontWeight="bold" fontSize="lg">Finishing Type:</Text>
                            <Text fontSize="md">{listing.finishingType}</Text>
                        </Box>
                    </Box>

                    <Box mt={4}>
                        <Text fontWeight="bold" fontSize="lg">Amenities:</Text>
                        <Flex wrap="wrap">
                            {listing.amenities.map((amenity: IAmenity) => (
                                <Tag key={amenity._id} colorScheme="blue" m={1}>
                                    {amenity.name}
                                </Tag>
                            ))}
                        </Flex>
                    </Box>
                </VStack>
            </Box>
        </>
    );
};

export default DetailsPage;

"use client";

import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    HStack,
    SimpleGrid,
    Spinner,
    Text,
    useToast,
} from '@chakra-ui/react';
import {MdBathtub, MdBedroomChild, MdCropSquare, MdLocationOn} from 'react-icons/md';
import React, {useEffect, useState} from 'react';
import {IListingResponse} from '@/app/responses/listing-response.interface';
import {IListItem} from '@/app/responses/list-item.interface';
import {useRouter} from 'next/navigation';
import {formatPrice} from '@/app/helpers/currency-format';
import {ListingsEndpoints} from '@/app/constants/routes.const';
import axiosInstance from '@/app/axios/axiosInstance';
import Image from "next/image";

const ListingsPage = () => {
    const [listings, setListings] = useState<IListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalListings, setTotalListings] = useState<number>(0);
    const listingsPerPage = 10; // Number of listings per page
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                const offset = (currentPage - 1) * listingsPerPage;
                const response = await axiosInstance.get<IListingResponse>(`/units`, {
                    params: {
                        limit: listingsPerPage,
                        offset: offset,
                    },
                });
                setListings(response.data.listings);
                setTotalListings(response.data.pagination.total);
            } catch {
                toast({
                    title: "Error fetching listings.",
                    description: "There was an issue retrieving listings. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [currentPage, toast]);

    const handleCardClick = (id: string) => {
        router.push(ListingsEndpoints.UNITS_LIST + `/${id}`);
    };

    const totalPages = Math.ceil(totalListings / listingsPerPage);

    if (listings.length === 0 && !loading) {
        return (
            <Box textAlign="center" py={10} px={6}>
                <Heading size="lg" mb={4}>No Listings Found</Heading>
                <Text fontSize="md" color="gray.600">We couldn&apos;t find any listings. Please try again
                    later.</Text>
            </Box>
        );
    }

    return (
        <Box>
            <Heading mb={6} size='xl'>Available Listings</Heading>
            <Heading mb={6} size='lg'>{totalListings} Results Found</Heading>

            {loading ? (
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
            ) : (
                <>
                    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                        {listings.map((listing) => (
                            <Card
                                key={listing._id}
                                onClick={() => handleCardClick(listing._id)}
                                cursor="pointer"
                                boxShadow={"5px 4px 15px 1px rgba(0,0,0,0.2)"}
                                borderRadius="lg"
                                overflow="hidden"
                                transition="transform 0.2s"
                                _hover={{transform: 'scale(1.05)'}} // Add hover effect
                            >
                                <Box w={"100%"} height="300px" position="relative">
                                    <Image
                                        src={listing.imageUrls[0]}
                                        alt={listing.name} // Improve accessibility
                                        fill // Use fill to cover the box
                                        style={{objectFit: "cover"}}
                                    />
                                </Box>
                                <CardBody>
                                    <Text fontWeight="bold" fontSize="lg">{listing.name}</Text>
                                    <Text display="flex" alignItems="center" mb={1}>
                                        <MdLocationOn
                                            style={{marginRight: '5px', color: 'rgb(204 57 0)'}}/>
                                        {listing.compound}
                                    </Text>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <MdBedroomChild style={{marginRight: '5px'}}/>
                                        {listing.bedrooms} Bed
                                        <MdBathtub
                                            style={{marginRight: '5px', marginLeft: '10px'}}/>
                                        {listing.bathrooms} Bath
                                    </Box>
                                    <Text fontWeight="bold" color="#008080" fontSize="lg">
                                        {formatPrice(listing.price, listing.currency)}
                                    </Text>
                                    <Box display="flex" alignItems="center">
                                        <MdCropSquare style={{marginRight: '5px'}}/>
                                        <Text fontWeight="bold">{listing.size} m²</Text>
                                    </Box>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>

                    {/* Pagination Controls */}
                    <HStack spacing={4} mt={5} justifyContent="center">
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            isDisabled={currentPage === 1}
                            colorScheme="teal"
                        >
                            Previous
                        </Button>
                        <Text>
                            Page {currentPage} of {totalPages}
                        </Text>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            isDisabled={currentPage === totalPages}
                            colorScheme="teal"
                        >
                            Next
                        </Button>
                    </HStack>
                </>
            )}
        </Box>
    );
};

export default ListingsPage;

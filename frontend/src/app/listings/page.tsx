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
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [currentPage]);

    const handleCardClick = (id: string) => {
        router.push(ListingsEndpoints.UNITS_LIST + `/${id}`);
    };

    const totalPages = Math.ceil(totalListings / listingsPerPage);

    if (listings.length == 0 && !loading) {
        return <Box textAlign="center" py={10} px={6}>
            <Heading size="lg" mb={4}>No Listings Found</Heading>
            <Text fontSize="md" color="gray.600">We could&apos;t find any listings. Please try again later.</Text>
        </Box>
    }

    return (
        <Box>
            <Heading mb={6} size='xl'>Available Listings</Heading>
            <Heading mb={6} size='l'>{totalListings} Results Found</Heading>


            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center" // Center horizontally
                    alignItems="center"      // Center vertically
                    height="100vh"           // Full viewport height
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
                            <Card key={listing._id} onClick={() => handleCardClick(listing._id)}
                                  cursor="pointer" boxShadow={"5px 4px 15px 1px rgba(0,0,0,0.2)"}>
                                <Box w={"100%"} borderRadius="md" minH="300px">
                                <Image
                                    src={listing.imageUrls[0]}
                                    alt="Image"
                                    width={800}
                                    height={300}
                                    style={{objectFit: "cover", height:"300px", width:"100%"}}
                                />
                                </Box>
                                <CardBody>
                                    <Text fontWeight="bold">{listing.name}</Text>
                                    <Text display="flex" alignItems="center">
                                        <MdLocationOn style={{
                                            marginRight: '5px',
                                            color: 'rgb(204 57 0)'
                                        }}/> {/* Location icon */}
                                        {listing.compound}
                                    </Text>
                                    <Box display="flex" alignItems="center">
                                        <MdBedroomChild style={{marginRight: '5px'}}/>
                                        {listing.bedrooms} Bed
                                        \ <MdBathtub style={{marginRight: '5px'}}/>
                                        {listing.bathrooms} Bath
                                    </Box>
                                    <Text fontWeight="bold"
                                          style={{'color': '#008080'}}>{formatPrice(listing.price, listing.currency)}</Text>
                                    <Box display="flex" alignItems="center"> {/* Size with icon */}
                                        <MdCropSquare
                                            style={{marginRight: '5px'}}/> {/* Size icon */}
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
                        >
                            Previous
                        </Button>
                        <Text>
                            Page {currentPage} of {totalPages}
                        </Text>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            isDisabled={currentPage === totalPages}
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

"use client";

import {Box, Heading, Image, Spinner, Tag, Text, VStack} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {formatPrice} from '@/app/helpers/currency-format';
import {IAmenity} from '@/app/responses/amenity.interface';
import {MdAttachMoney, MdBathtub, MdBedroomChild, MdCropSquare, MdLocationOn} from 'react-icons/md';
import axiosInstance from '@/app/axios/axiosInstance';

const DetailsPage = ({params}: { params: { id: string } }) => {
    const [listing, setListing] = useState<any>(null); // State for the listing details
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchListingDetails = async () => {
            if (params.id) { // Check if the ID is available
                try {
                    setLoading(true); // Start loading
                    const response = await axiosInstance.get(`units/${params.id}`);
                    setListing(response.data); // Set the listing details
                } catch (error) {
                    console.error('Error fetching listing details:', error);
                } finally {
                    setLoading(false); // Stop loading
                }
            }
        };

        fetchListingDetails();
    }, [params.id]);

    if (loading) {
        return (
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
        );
    }

    if (!listing) {
        return <Text>No listing found.</Text>; // Handle case where listing is not found
    }

    const settings = {
        dots: true,
        infinite: listing.imageUrls.length > 1, // Infinite scrolling only if there's more than 1 image
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box p={50}  boxShadow={"5px 4px 15px 1px rgba(0,0,0,0.2)"} borderRadius="md" background="#fcfcfc">
            <Heading mb={6} fontSize="2xl"
                     fontWeight="bold">{listing.name}</Heading>

            <Box maxW={800} mt={10} mx={'auto'}
                 overflow="hidden">
                <Slider {...settings} autoplay={true}>
                    {listing.imageUrls.map((image: string, index: number) => (
                        <Box key={index} borderRadius="lg"  >
                            <Image
                                src={image}
                                alt={`Slide ${index}`}
                                objectFit="cover" // Use cover to maintain aspect ratio
                                width="100%"      // Set width to 100% for responsiveness
                                height="400px"    // Set a fixed height
                                display="block"
                                borderRadius="lg"
                                borderWidth="1px"
                            />
                        </Box>
                    ))}
                </Slider>
            </Box>

            <VStack spacing={5} mt={6} align="start" width="fit-content">
                <Text fontWeight="bold" fontSize="lg">Description:</Text>
                <Text fontSize="md" color="gray.700">{listing.description}</Text>

                <Box>
                    <Text fontWeight="bold" fontSize="lg">Basic Info:</Text>
                    <Box display="flex" alignItems="center">
                        <MdAttachMoney style={{marginRight: '5px', color: 'green'}}/>
                        <Text
                            fontSize="lg">{formatPrice(listing.price, listing.currency)}</Text>
                    </Box>
                    <Box display="flex" alignItems="center"> {/* Size with icon */}
                        <MdCropSquare
                            style={{marginRight: '5px'}}/> {/* Size icon */}
                        <Text>{listing.size} m²</Text>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <MdBedroomChild style={{marginRight: '5px'}}/>
                        {listing.bedrooms} Bed
                        \ <MdBathtub style={{marginRight: '5px'}}/>
                        {listing.bathrooms} Bath
                    </Box>

                    <Box display="flex" alignItems="center">
                        <MdLocationOn style={{
                            marginRight: '5px',
                            color: 'rgb(204 57 0)'
                        }}/> {/* Location icon */}
                        {listing.compound}
                    </Box>
                </Box>
                <Box display="flex" width="100%" flexWrap="wrap" justifyContent="space-between">
                    <Box display="flex" flexDirection="column">
                        <Text fontWeight="bold" fontSize="lg">Property Type</Text>
                        <Text fontSize="md">{listing.propertyType}</Text>
                    </Box>
                    <Box display="flex" flexDirection="column">

                        <Text fontWeight="bold" fontSize="lg">Sale Type</Text>
                        <Text fontSize="md">{listing.saleType}</Text>
                    </Box>

                    <Box display="flex" flexDirection="column">

                        <Text fontWeight="bold" fontSize="lg">Finishing Type</Text>
                        <Text fontSize="md">{listing.finishingType}</Text>
                    </Box>
                </Box>

                <Box>
                    <Text fontWeight="bold" fontSize="lg">Amenities:</Text>
                    {listing.amenities.map((amenity: IAmenity) => (
                        <Tag key={amenity._id} colorScheme="blue" m={1}>
                            {amenity.name}
                        </Tag>
                    ))}
                </Box>
            </VStack>
        </Box>
    );
};

export default DetailsPage;

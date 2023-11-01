import { useRouter } from 'next/router';
import { movieData } from "../../src/utils/data/data"
import { Box, Text, Image, Button } from "@chakra-ui/react";

export default function MoviePage() {
  const router = useRouter();
  const redirectToHome = () => {
    router.push('/');
  };
  const { id } = router.query;
  console.log("id: " + id);

  const testimonial = movieData.find((item) => item.id === id);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        {testimonial ? (
          <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Image src={testimonial.img} alt={testimonial.title} />
            <Text mt={2} fontSize="xl" fontWeight="bold">
              {testimonial.title}
            </Text>
          </Box>
        ) : (
          <Text fontSize="xl">No data found.</Text>
        )}
      </Box>
      <Button onClick={redirectToHome}>Go to Home</Button>
    </>
  );
}


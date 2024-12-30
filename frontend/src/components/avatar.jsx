import { Box, Image } from '@chakra-ui/react';

const Avatar = ({ src, size = 'md' }) => {
  return (
    <Box borderRadius="full" overflow="hidden" width={size} height={size}>
      <Image src={src} alt="User Avatar" />
    </Box>
  );
};

export default Avatar;

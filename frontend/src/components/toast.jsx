import { useToast } from '@chakra-ui/react';

const Toast = ({ title, description, status }) => {
  const toast = useToast();

  const showToast = () => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  return <button onClick={showToast}>Show Toast</button>;
};

export default Toast;

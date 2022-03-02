import { useToast } from '@chakra-ui/react'

type ToastType = {
    str: string;
    status: "info" | "warning" | "success" | "error";
}

export const useMessage = () => {

    // hook
    const toast = useToast();

    // function
    const showMessage = (props: ToastType) => {

        const { str, status } = props;

        toast({
            position: 'top',
            description: str,
            status,
            duration: 1000,
            isClosable: true,
        });
    }

    return { showMessage };
}

import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';

export const useAlertDialog = () => {

    // hooks
    const [message, setMessage] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    // functions
    const onOpenDialog = () => onOpen();
    const onCloseDialog = (callBack: () => void) => {
        onClose();
        callBack();
    }

    return {
        isOpen,
        onOpenDialog,
        onCloseDialog,
        message,
        setMessage
    };
}

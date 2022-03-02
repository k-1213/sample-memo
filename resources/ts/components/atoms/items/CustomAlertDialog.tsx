import React, { useRef, VFC } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"

type Props = {
    isOpen: boolean,
    onClose: (isYes: boolean) => void,
    confirmMessage: string
}

export const CustomAlertDialog: VFC<Props> = (props) => {

    // props
    const { isOpen, onClose, confirmMessage } = props;

    // hook
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={() => onClose(false)}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>

                    <AlertDialogHeader>確認</AlertDialogHeader>

                    <AlertDialogBody>
                        {confirmMessage}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button colorScheme='red' onClick={() => onClose(true)} mr={3}>
                            はい
                        </Button>
                        <Button ref={cancelRef} onClick={() => onClose(false)}>
                            いいえ
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

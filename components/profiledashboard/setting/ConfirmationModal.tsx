import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface ConfirmationModalProps {
    isOpen: boolean; // Controls modal visibility
    onClose: () => void; // Function to close the modal
    onConfirm: () => Promise<boolean>; // Function to confirm action (returns a Promise)
    title?: string; // Optional title for the modal
    description?: string; // Optional description for the modal
    successMessage?: string; // Message on successful confirmation
    errorMessage?: string; // Message on failed confirmation
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 onConfirm,
                                                                 title = "Are you sure you want to update?", // Default title
                                                                 description = "This action will change your information", // Default description
                                                                 successMessage = "Update test-profile successful", // Default success message
                                                                 errorMessage = "Update test-profile failed", // Default error message
                                                             }) => {
    const handleConfirm = async () => {
        try {
            // Call onConfirm and await its result
            const result = await onConfirm();

            // Show toast based on the result
            if (result) {
                toast({
                    title: "Success",
                    description: successMessage,
                    variant: "default",
                });
                onClose(); // Close the modal on success
            } else {
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Unexpected error during confirmation:", error);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-purple-500 hover:bg-purple-700"
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationModal;

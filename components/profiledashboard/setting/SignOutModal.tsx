import React from 'react';
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
import { useRouter } from 'next/navigation';

interface SignOutModalProps {
    isOpen: boolean;
    onClose: () => void;
}


const SignOutModal: React.FC<SignOutModalProps> = ({
                                                       isOpen,
                                                       onClose
                                                   }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            // Redirect to external logout URL
            const logoutUrl = 'http://localhost:8080/logout';
            window.location.href = logoutUrl;

            // Show success toast after redirection
            toast({
                title: "Signed Out",
                description: "You have been successfully signed out",
                variant: "default"
            });

            // Redirect to home page after a short delay
            setTimeout(() => {
                router.push('http://localhost:8081/');
            }, 2000); // Adjust delay as needed

        } catch (error) {
            // Handle sign-out errors
            toast({
                title: "Sign Out Error",
                description: "Failed to sign out. Please try again.",
                variant: "destructive"
            });
            console.error("Sign out error:", error);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to sign out of your account?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSignOut}
                        className="bg-red-500 hover:bg-red-700"
                    >
                        Sign Out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SignOutModal;
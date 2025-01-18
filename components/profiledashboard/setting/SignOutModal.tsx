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
import Link from "next/link";

interface SignOutModalProps {
    isOpen: boolean;
    onClose: () => void;
}


const SignOutModal: React.FC<SignOutModalProps> = ({
                                                       isOpen,
                                                       onClose
                                                   }) => {

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
                        className="bg-red-500 hover:bg-red-700"
                    >
                        <Link href={'https://oauth2.cloudinator.istad.co/logout'}>Sign Out</Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SignOutModal;

// "use client"
// import React from 'react';
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// // import { useRouter } from 'next/navigation';

// interface SignOutModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const SignOutModal: React.FC<SignOutModalProps> = ({
//                                                        isOpen,
//                                                        onClose
//                                                    }) => {
//     // const router = useRouter();

//     const handleSignOut = async () => {
//         try {
//             // First, call gateway logout to clear gateway session
//             const gatewayLogoutResponse = await fetch('http://localhost:8081/logout', {
//                 method: 'GET',
//                 credentials: 'include'
//             });

//             if (gatewayLogoutResponse.ok) {
//                 // Then call identity server logout
//                 const identityLogoutResponse = await fetch('/identity/logout', {
//                     method: 'GET',
//                     credentials: 'include'
//                 });

//                 if (identityLogoutResponse.ok) {
//                     // Clear any local storage/state
//                     localStorage.clear();
//                     sessionStorage.clear();

//                     // For external URLs, use window.location
//                     window.location.href = 'http://localhost:8081';
//                     // Or you could use
//                     // window.location.replace('http://localhost:8081');
//                 }
//             }
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <AlertDialog open={isOpen} onOpenChange={onClose}>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Sign Out</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         Are you sure you want to sign out of your account?
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
//                     <AlertDialogAction
//                         onClick={handleSignOut}
//                         className="bg-red-500 hover:bg-red-700"
//                     >
//                         Sign Out
//                     </AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );
// };

// export default SignOutModal;

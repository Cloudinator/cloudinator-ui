// "use client";

import Setting from "@/components/profiledashboard/setting/Setting";

// import { useParams } from 'next/navigation';
// import { useGetMeQuery, useUpdateUserByUsernameMutation } from '@/redux/api/userApi';
// import { useState, useEffect } from 'react';
// import { User, Upload } from 'lucide-react';
// import Image from 'next/image';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "@/hooks/use-toast";
// import Loading from "@/components/Loading";

// export default function ProfilePage() {
//     const params = useParams();
//     const [email, setEmail] = useState('');
//     const [displayUsername, setDisplayUsername] = useState('');
//     const [avatarSrc, setAvatarSrc] = useState("/placeholder.png");

//     // Fetch current user data
//     const { data: userData, error, isLoading } = useGetMeQuery();
//     const [updateUserByUsername, { isLoading: isUpdating }] = useUpdateUserByUsernameMutation();

//     // Populate state with fetched user data
//     useEffect(() => {
//         if (userData) {
//             setEmail(userData.email);
//             setDisplayUsername(userData.username);
//         }
//     }, [userData]);

//     const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setAvatarSrc(e.target?.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await updateUserByUsername({
//                 username: String(params.id),
//                 userUpdateRequest: {
//                     email,
//                     username: displayUsername,
//                 }
//             }).unwrap();
//             toast({
//                 title: "Profile Updated",
//                 description: "Your test-profile information has been successfully updated.",
//                 variant: "default",
//             });
//         } catch {
//             toast({
//                 title: "Update Failed",
//                 description: "There was an error updating your test-profile. Please try again.",
//                 variant: "destructive",
//             });
//         }
//     };

//     if (isLoading) return <div className="w-full h-full grid place-content-center"><Loading /></div>;
//     if (error) return <div className="w-full h-full text-purple-500 text-3xl grid place-content-center">Error loading user data.</div>;

//     return (
//         <div className="flex flex-col bg-background h-screen w-full p-6 md:p-10">
//             <div className="w-full">
//                 <h1 className="text-3xl font-bold text-purple-500 flex items-center mb-8">
//                     <User className="mr-2 h-8 w-8" />
//                     Profile Information
//                 </h1>

//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     <div className="flex items-start space-x-4">
//                         <div className="h-20 w-20 rounded-full bg-muted overflow-hidden border border-border">
//                             <Image
//                                 src={avatarSrc}
//                                 width={100}
//                                 height={100}
//                                 alt="Profile"
//                                 className="h-full w-full object-cover"
//                             />
//                         </div>
//                         <div>
//                             <Button
//                                 type="button"
//                                 onClick={() => document.getElementById('avatar-upload')?.click()}
//                                 variant="outline"
//                                 className="mb-2 text-purple-500 hover:text-purple-700"
//                             >
//                                 <Upload className="w-4 h-4 mr-2 text-purple-500 hover:text-purple-700" /> Change avatar
//                             </Button>
//                             <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleAvatarChange}
//                                 className="hidden"
//                                 id="avatar-upload"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <Label htmlFor="email" className="text-base text-purple-500">
//                             <span className="text-red-500">*</span> Email Address
//                         </Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="mt-2"
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <Label htmlFor="username" className="text-base text-purple-500">
//                             <span className="text-red-500">*</span> Username
//                         </Label>
//                         <Input
//                             id="username"
//                             type="text"
//                             value={displayUsername}
//                             onChange={(e) => setDisplayUsername(e.target.value)}
//                             className="mt-2"
//                             placeholder="Enter your username"
//                             required
//                         />
//                     </div>

//                     <div className="flex justify-end">
//                         <Button
//                             type="submit"
//                             className="bg-purple-500 hover:bg-purple-700"
//                             disabled={isUpdating}
//                         >
//                             {isUpdating ? 'Updating...' : 'Update Profile'}
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

export default function ProfilePage() {
  return (
    <>
        <Setting />
    </>
  );
}
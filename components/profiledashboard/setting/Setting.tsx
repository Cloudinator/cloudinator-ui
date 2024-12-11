"use client";

import { useState, useEffect } from "react";
import { Upload, User } from 'lucide-react';
import Image from 'next/image';
import { useGetMeQuery } from "@/redux/api/userApi";
import DashboardSubNavbar from "@/components/navbar/DashboardSubNavbar";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

const Setting = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [avatarSrc, setAvatarSrc] = useState("/placeholder.png");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch user data
    const { data: userData, error, isLoading } = useGetMeQuery();

    // Update state when userData is fetched
    useEffect(() => {
        if (userData) {
            setEmail(userData.email);
            setUsername(userData.username);
        }
    }, [userData]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setIsModalOpen(true);
    };

    const handleConfirmSave = () => {
        setIsModalOpen(false);
        // Simulate saving changes
        toast({
            title: "Changes Saved",
            description: "Your profile information has been updated successfully.",
            variant: "default",
        });
    };

    if (isLoading) return <div className="w-full h-full grid place-content-center"><Loading /></div>;
    if (error) return <div className="w-full h-full text-purple-500 text-3xl grid place-content-center">Error loading user data.</div>;

    return (
        <div className="flex flex-col bg-background h-screen w-full">
            <DashboardSubNavbar />
            <div className="flex-grow p-6 md:p-10 w-full">
                <div className="w-full">
                    <h1 className="text-3xl font-bold mb-6 text-purple-500 flex items-center">
                        <User className="mr-2 h-8 w-8" />
                        Personal Information
                    </h1>
                    <p className="text-muted-foreground mb-8">Use a permanent address where you can receive mail.</p>
                    <div className="space-y-8">
                        {/* Avatar Section */}
                        <div className="flex items-start space-x-4">
                            <div className="h-20 w-20 rounded-full bg-muted overflow-hidden border border-border">
                                <Image
                                    src={avatarSrc}
                                    width={100}
                                    height={100}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={() => document.getElementById('avatar-upload')?.click()}
                                    variant="outline"
                                    className="mb-2 text-purple-500 hover:text-purple-700"
                                >
                                    <Upload className="w-4 h-4 mr-2 text-purple-500 hover:text-purple-700" /> Change avatar
                                </Button>
                                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    id="avatar-upload"
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            {/* Email Address */}
                            <div>
                                <Label htmlFor="email" className="text-base text-purple-500">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <Label htmlFor="username" className="text-base text-purple-500">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-2"
                                    placeholder="Enter your username"
                                />
                            </div>

                            {/* Timezone */}
                            <div>
                                <Label htmlFor="timezone" className="text-base text-purple-500">Timezone</Label>
                                <Select>
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select your timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pst">Pacific Standard Time</SelectItem>
                                        <SelectItem value="mst">Mountain Standard Time</SelectItem>
                                        <SelectItem value="cst">Central Standard Time</SelectItem>
                                        <SelectItem value="est">Eastern Standard Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <Button onClick={handleSave} className="bg-purple-500 hover:bg-purple-700">
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to save these changes to your profile?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsModalOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmSave}
                            className="bg-purple-500 hover:bg-purple-700"
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default Setting;

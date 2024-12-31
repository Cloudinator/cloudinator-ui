import React, { useState, useEffect } from 'react';
import { User, Upload } from 'lucide-react';
import Image from 'next/image';
import { useUpdateUserByUsernameMutation } from "@/redux/api/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: {
        id: string;
        email: string;
        username: string;
        avatar: string;
        timezone: string;
    };
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ isOpen, onClose, userData }) => {
    const [email, setEmail] = useState(userData.email);
    const [username, setUsername] = useState(userData.username);
    const [avatarSrc, setAvatarSrc] = useState(userData.avatar || "/placeholder.png");
    const [timezone, setTimezone] = useState(userData.timezone || '');

    const [updateUser, { isLoading: isUpdating, isError, isSuccess }] = useUpdateUserByUsernameMutation();

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Profile Updated",
                description: "Your test-profile information has been successfully updated.",
                variant: "default",
            });
            onClose();
        }

        if (isError) {
            toast({
                title: "Update Failed",
                description: "There was an error updating your test-profile. Please try again.",
                variant: "destructive",
            });
        }
    }, [isSuccess, isError, onClose]);

    useEffect(() => {
        if (isOpen) {
            // Reset form fields when modal opens
            setEmail(userData.email);
            setUsername(userData.username);
            setAvatarSrc(userData.avatar || "/placeholder.png");
            setTimezone(userData.timezone || '');
        }
    }, [isOpen, userData]);

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

    const handleSubmit = async () => {
        if (!email || !username) {
            toast({
                title: "Validation Error",
                description: "Email and Username cannot be empty.",
                variant: "destructive",
            });
            return;
        }

        try {
            // Create the user update request
            const userUpdateRequest = {
                email,
                timezone,
            };

            // Call the updateUser mutation with the username and the update request
            await updateUser({
                username,
                userUpdateRequest,
            }).unwrap();
        } catch (error) {
            console.error('Failed to update user', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-purple-500 flex items-center">
                        <User className="mr-2 h-6 w-6"/>
                        Update Profile
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center space-x-4">
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
                                onClick={() => document.getElementById('avatar-upload-modal')?.click()}
                                variant="outline"
                                className="mb-2 text-purple-500 hover:text-purple-700"
                            >
                                <Upload className="w-4 h-4 mr-2 text-purple-500 hover:text-purple-700"/> Change avatar
                            </Button>
                            <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                                id="avatar-upload-modal"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={isUpdating} className="bg-purple-500 hover:bg-purple-700">
                        {isUpdating ? 'Saving...' : 'Save changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateUserModal;

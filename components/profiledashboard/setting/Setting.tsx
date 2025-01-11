"use client";

import { useParams } from "next/navigation";
import {
  useGetMeQuery,
  useUpdateUserByUsernameMutation,
} from "@/redux/api/userApi";
import { useState, useEffect } from "react";
import { Upload, Settings } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";
import SignOutModal from "./SignOutModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {format} from "date-fns";


export default function ProfilePage() {
  const params = useParams();

  const [email, setEmail] = useState<string>("");
  const [displayUsername, setDisplayUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [avatarSrc, setAvatarSrc] = useState<string>("/placeholder.png");
  const [isSignOutModalOpen, setSignOutModalOpen] = useState<boolean>(false);

  const { data: userData, error, isLoading } = useGetMeQuery();
  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserByUsernameMutation();

    useEffect(() => {
      if (userData) {
        setEmail(userData.email);
        setDisplayUsername(userData.username);
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setPhoneNumber(userData.phoneNumber || "");
        setDateOfBirth(userData.dateOfBirth ? new Date(userData.dateOfBirth) : undefined); // Convert string to Date
        setStatus(userData.status || "");
        setGender(userData.gender || "");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser({
        username: String(params.id),
        userUpdateRequest: {
          email,
          username: displayUsername,
          firstName,
          lastName,
          phoneNumber,
          dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : undefined, // Convert Date to string
          status,
          gender,
        },
      }).unwrap();
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to update user", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading)
    return (
      <div className="w-full h-full grid place-content-center">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full text-purple-500 text-3xl grid place-content-center">
        User Must Login First
      </div>
    );

  return (
    <div className="flex flex-col bg-background min-h-screen w-full p-6 md:p-10">
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-purple-500 flex items-center mb-8">
            <Settings className="mr-2 h-8 w-8" />
            Setting
          </h1>

          <Button
            type="button"
            onClick={() => setSignOutModalOpen(true)}
            variant="destructive"
            className="bg-red-500 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            Logout
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
                type="button"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
                variant="outline"
                className="mb-2 text-purple-500 hover:text-purple-700"
              >
                <Upload className="w-4 h-4 mr-2 text-purple-500 hover:text-purple-700" />{" "}
                Change avatar
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, GIF or PNG. 1MB max.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-base text-purple-500">
              <span className="text-red-500">*</span> Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-base text-purple-500">
              <span className="text-red-500">*</span> Username
            </Label>
            <Input
              id="username"
              type="text"
              value={displayUsername}
              onChange={(e) => setDisplayUsername(e.target.value)}
              className="mt-2"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <Label htmlFor="firstname" className="text-base text-purple-500">
              <span className="text-red-500">*</span> First Name
            </Label>
            <Input
              id="firstname"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <Label htmlFor="lastname" className="text-base text-purple-500">
              <span className="text-red-500">*</span> Last Name
            </Label>
            <Input
              id="lastname"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="text-base text-purple-500">
              <span className="text-red-500">*</span> Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-2"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <Label htmlFor="dateOfBirth" className="text-base text-purple-500">
            <span className="text-red-500">*</span> Date of Birth
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-2"
                >
                  {dateOfBirth ? (
                    format(dateOfBirth, "PPP") // Format the date using date-fns
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={setDateOfBirth}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="status" className="text-base text-purple-500">
              <span className="text-red-500">*</span> Status
            </Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 block w-full p-2 border border-border rounded-md"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <Label htmlFor="gender" className="text-base text-purple-500">
              <span className="text-red-500">*</span> Gender
            </Label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-2 block w-full p-2 border border-border rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Sign Out Modal */}
          <SignOutModal
            isOpen={isSignOutModalOpen}
            onClose={() => setSignOutModalOpen(false)}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
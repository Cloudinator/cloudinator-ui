"use client";

import { Upload, User } from "lucide-react";
import { useState, useEffect } from "react";
import DashboardSubNavbar from "@/components/navbar/DashboardSubNavbar";
import { useGetMeQuery } from "@/redux/api/userApi";
import Image from 'next/image'
import Loading from "@/components/Loading";

const Setting = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [avatarSrc, setAvatarSrc] = useState("/placeholder.png");

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

    if (isLoading) return <div className="w-full h-screen grid place-content-center"><Loading /></div>;
    if (error) return <div className="w-full h-screen text-purple-500 text-3xl grid place-content-center">Error loading user data.</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Navigation */}
            <DashboardSubNavbar />
            {/* Profile Settings Content */}
            <div className="px-10 py-6">
                <h1 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
                    <User className="mr-2 h-8 w-8 text-purple-600" />
                    Personal Information
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mb-6">Use a permanent address where you can receive mail.</p>
                <div className="space-y-8">
                    {/* Avatar Section */}
                    <div className="flex items-start space-x-4">
                        <div className="h-20 w-20 rounded-full bg-gray-200 overflow-hidden border border-purple-300">
                            <Image
                                src={avatarSrc}
                                width={100}
                                height={100}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <button onClick={() => document.getElementById('avatar-upload')?.click()} className="inline-flex items-center px-4 py-2 border border-purple-500 rounded-lg text-sm font-medium text-purple-500 bg-white hover:bg-purple-50 transition duration-200 ease-in-out mb-1">
                                <Upload className="w-4 h-4 mr-2" /> Change avatar
                            </button>
                            <p className="text-sm text-gray-500 dark:text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="avatar-upload" />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-6">

                        {/* Email Address */}
                        <div className="col-span-full">
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring focus:ring-purple500 dark:text-gray-700 focus:border-transparent transition duration-200 ease-in-out"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Username */}
                        <div className="col-span-full">
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                            <div className="flex">
                                {/*<span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-purple-300 bg-purple-100 text-purple-600 text-lg">example.com/</span>*/}
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex-grow px-4 py-2 border border-purple-300 rounded-lg rounded-r-lg dark:text-gray-700 focus:outline-none focus:ring focus:ring-purple500 focus:border-transparent transition duration-200 ease-in-out text-lg"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Timezone */}
                        <div className="col-span-full">
                            <label className="block text-lg font-medium text-gray700 dark:text-gray300 mb2">Timezone</label>
                            <select
                                defaultValue=""
                                className="w-full px-[0.475rem] py-[0.475rem] border border-purple-300 rounded-lg dark:text-gray-700 focus:outline-none focus:ring focus:ring-purple500 focus:border-transparent transition duration200 ease-in-out text-lg"
                            >
                                <option value="" disabled>Select your timezone</option>
                                <option value="pst">Pacific Standard Time</option>
                                <option value="mst">Mountain Standard Time</option>
                                <option value="cst">Central Standard Time</option>
                                <option value="est">Eastern Standard Time</option>
                            </select>
                        </div>

                        {/* Save Button */}
                        <div className="col-span-full flex justify-end">
                            <button
                                className="px-[1.5rem] py-[0.475rem] bg-purple600 text-purple-500 rounded-lg hover:bg-purple700 transition duration200 ease-in-out font-medium shadow-md transform hover:scale-[1.02]"
                                onClick={() => alert('Settings saved!')} // Placeholder for save functionality
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, User2, Server, Globe, Eye, EyeOff, ArrowLeft, Zap } from 'lucide-react';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useGetDatabaseServicesQuery } from "@/redux/api/projectApi";
import Lottie from "lottie-react";
import LoadingMissile from "@/public/LoadingMissile.json";
import Breadcrumbs from '@/components/Breadcrumb2';

interface DatabaseDetailProps {
  params: Promise<{
    name: string;
  }>;
}

export default function DatabaseDetail({ params }: DatabaseDetailProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Unwrap the params Promise using React.use()
  const { name } = React.use(params);

  // Get the workspace name from localStorage
  const selectedWorkspace = typeof window !== 'undefined' 
    ? localStorage.getItem("selectedWorkspace") || ""
    : "";

  const { data: databaseData, isLoading } = useGetDatabaseServicesQuery({
    workspaceName: selectedWorkspace,
    size: 50,
    page: 0,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Lottie
            animationData={LoadingMissile}
            loop={true}
            style={{ width: 64, height: 64 }}
          />
          <p className="text-sm text-gray-500">Loading database details...</p>
        </div>
      </div>
    );
  }

  const database = databaseData?.results.find(db => db.dbName === name);

  if (!database) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          Database not found
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          The database &quot;{name}&quot; does not exist.
        </p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const connectionString = `${database.dbType.toLowerCase()}://${database.username}:${showPassword ? database.password : '********'}@${database.subdomain}:${database.port}`;

  return (
    <div className="px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <Breadcrumbs />

        <Card className="bg-white dark:bg-gray-800 shadow-lg mt-6 border border-gray-200 dark:border-gray-700">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8 text-purple-500" />
                <CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {database.dbName}
                </CardTitle>
              </div>
              <Badge 
                variant="outline"
                className="bg-green-100 text-green-700 border-green-200 animate-pulse flex items-center gap-1"
              >
                <Zap className="w-4 h-4" />
                Active
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">
                  Database Information
                </h3>
                
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Database Type</p>
                    <p className="font-medium">{database.dbType} {database.dbVersion}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User2 className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Database Name</p>
                    <p className="font-medium">{database.dbName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Port</p>
                    <p className="font-medium">{database.port}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">
                  Connection Details
                </h3>

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Host</p>
                    <p className="font-medium">{database.subdomain}.cloudinator.cloud</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Password</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {showPassword ? database.password : "••••••••"}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-purple-500 hover:text-purple-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">
                Connection String
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <code className="text-sm">
                  {connectionString}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
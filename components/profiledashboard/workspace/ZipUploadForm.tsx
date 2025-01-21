'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadZipMutation } from "@/redux/api/file"
import { useDeployZipServiceMutation } from "@/redux/api/projectApi"
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'

interface ZipUploadFormProps {
    onClose: () => void
    selectedWorkspace: string
    data1: () => void
}

interface ErrorResponse {
    status?: string;
    originalStatus?: number;
    data?: {
        message?: string;
    };
}

export function ZipUploadForm({ onClose, selectedWorkspace, data1 }: ZipUploadFormProps) {
    const [file, setFile] = useState<File | null>(null)
    const [projectName, setProjectName] = useState('')
    const [uploadZip] = useUploadZipMutation()
    const [deployZipService] = useDeployZipServiceMutation()
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1)
    const { toast } = useToast()

    const sanitizeInput = (value: string) => {
        return value.replace(/\s+/g, '-').toLowerCase() // Converts spaces to hyphens and makes it lowercase
    }

    const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = sanitizeInput(event.target.value)
        setProjectName(sanitizedValue) // Update state with sanitized project name
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/zip': ['.zip'],
        },
        multiple: false,
    })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!file) {
            toast({
                title: 'Error',
                description: 'Please select a file.',
                variant: 'error',
            })
            return
        }

        if (!projectName) {
            toast({
                title: 'Error',
                description: 'Please enter a project name.',
                variant: 'error',
            })
            return
        }

        setIsLoading(true)
        setStep(2)

        try {
            const [uploadResponse, deployResponse] = await Promise.all([
                uploadZip({
                    file,
                }).unwrap(),
                deployZipService({
                    name: projectName,
                    workspaceName: selectedWorkspace,
                    gitUrl: file.name,
                    type: 'frontend',
                    token: '',
                    branch: 'main',
                }).unwrap(),
            ])

            console.log('Upload successful:', uploadResponse)
            console.log('Project created:', deployResponse)

            toast({
                title: 'Success',
                description: 'Project created and deployed successfully.',
                variant: 'success',
            })

            setStep(3) // Move to the success step
            data1() // Refresh data
        } catch (err) {
            const error = err as ErrorResponse
            console.log('Error during project creation and deployment:', err)

            if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
                toast({
                    title: 'Success',
                    description: error?.data?.message || 'Project created and deployed successfully.',
                    variant: 'success',
                })
                setStep(3) // Move to the success step
                data1() // Refresh data
            } else {
                toast({
                    title: 'Error',
                    description: error?.data?.message || 'Error during project creation and deployment.',
                    variant: 'error',
                })
                setStep(4) // Move to the error step
            }
        } finally {
            setIsLoading(false)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="projectName" className="text-purple-500">Project Name</Label>
                            <Input
                                id="projectName"
                                value={projectName}
                                onChange={handleProjectNameChange}
                                required
                            />
                        </div>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                                isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
                            }`}
                        >
                            <input {...getInputProps()} />
                            {file ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <File className="w-6 h-6 text-purple-500" />
                                    <span className="text-purple-500">{file.name}</span>
                                </div>
                            ) : (
                                <div>
                                    <Upload className="w-12 h-12 mx-auto text-purple-500" />
                                    <p className="text-purple-500">Drag & drop a ZIP file here, or click to select one</p>
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading || !file || !projectName}
                            className="w-full flex items-center gap-2 bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Processing...' : 'Create Project'}
                        </Button>
                    </motion.div>
                )
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 text-center"
                    >
                        <h3 className="text-lg font-semibold text-purple-500">Uploading...</h3>
                    </motion.div>
                )
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 text-center"
                    >
                        <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                        <h3 className="text-xl font-semibold text-green-500">Success!</h3>
                        <p>Your project has been created successfully.</p>
                        <Button className="bg-purple-500 hover:bg-purple-700 w-[120px]" onClick={onClose}>Close</Button>
                    </motion.div>
                )
            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 text-center"
                    >
                        <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
                        <h3 className="text-xl font-semibold text-red-500">Error</h3>
                        <p>An error occurred while creating and deploying the project.</p>
                        <Button className="bg-purple-500 hover:bg-purple-700 w-[120px]" onClick={() => setStep(1)}>Try Again</Button>
                    </motion.div>
                )
        }
    }

    return (
        <div className="w-full px-2 py-2">
            {renderStep()}
        </div>
    )
}
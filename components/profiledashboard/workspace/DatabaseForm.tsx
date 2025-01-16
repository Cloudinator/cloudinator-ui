'use client'

import React, { useState, useEffect } from 'react'
import { FormField } from './FormField'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Database, User, Lock } from 'lucide-react'
import {useCreateDatabaseMutation} from "@/redux/api/projectApi";

interface DatabaseFormProps {
    onClose: () => void
    selectedWorkspace: string
}

const databaseVersions = {
    postgres: ['16', '15', '14', '13', '12', '11', '10'],
    mongodb: ['7.0', '6.0', '5.0', '4.4', '4.2', '4.0'],
    mysql: ['8.0', '5.7', '5.6']
}

export function DatabaseForm({ onClose,selectedWorkspace }: DatabaseFormProps) {
    const [projectFields, setProjectFields] = useState({
        dbname: '',
        dbuser: '',
        dbpassword: '',
        dbtype: '',
        dbversion: ''
    })

    const [createDatabaseDeployment] = useCreateDatabaseMutation();

    useEffect(() => {
        // Reset dbversion when dbtype changes
        setProjectFields(prev => ({ ...prev, dbversion: '' }))
    }, [projectFields.dbtype])

    // Helper function to sanitize input (replace spaces with hyphens)
    const sanitizeInput = (value: string) => {
        return value.replace(/\s+/g, '-').toLowerCase() // Replace spaces and convert to lowercase
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const sanitizedValue = sanitizeInput(value)
        setProjectFields((prev) => ({ ...prev, [name]: sanitizedValue }))
    }

    const handleSelectChange = (name: string, value: string) => {
        const sanitizedValue = sanitizeInput(value)
        setProjectFields((prev) => ({ ...prev, [name]: sanitizedValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log('Database deployment created:', projectFields)
            await createDatabaseDeployment({
                dbName: projectFields.dbname,
                dbUser: projectFields.dbuser,
                dbPassword: projectFields.dbpassword,
                dbType: projectFields.dbtype,
                dbVersion: projectFields.dbversion,
                workspaceName: selectedWorkspace,
            }).unwrap()
            onClose()
        } catch (error) {
            console.error('Failed to create database deployment:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 px-2 text-purple-600 py-2">
            <FormField
                icon={Database}
                label="Database Name"
                name="dbname"
                value={projectFields.dbname}
                onChange={handleInputChange}
                className="border-purple-600 focus:border-purple-700"
            />
            <FormField
                icon={User}
                label="Database User"
                name="dbuser"
                value={projectFields.dbuser}
                onChange={handleInputChange}
                className="border-purple-600 focus:border-purple-700"
            />
            <FormField
                icon={Lock}
                label="Database Password"
                name="dbpassword"
                type="password"
                value={projectFields.dbpassword}
                onChange={handleInputChange}
                className="border-purple-600 focus:border-purple-700"
            />
            <div className="space-y-2">
                <Label htmlFor="dbtype" className="text-sm font-medium">Database Type</Label>
                <Select value={projectFields.dbtype} onValueChange={(value) => handleSelectChange('dbtype', value)}>
                    <SelectTrigger id="dbtype">
                        <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {projectFields.dbtype && (
                <div className="space-y-2">
                    <Label htmlFor="dbversion" className="text-sm font-medium">Database Version</Label>
                    <Select value={projectFields.dbversion} onValueChange={(value) => handleSelectChange('dbversion', value)}>
                        <SelectTrigger id="dbversion">
                            <SelectValue placeholder="Select database version" />
                        </SelectTrigger>
                        <SelectContent>
                            {databaseVersions[projectFields.dbtype as keyof typeof databaseVersions].map((version) => (
                                <SelectItem key={version} value={version}>
                                    {projectFields.dbtype}:{version}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2">
                Create Database Project
            </Button>
        </form>
    )
}


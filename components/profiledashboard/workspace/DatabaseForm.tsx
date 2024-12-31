'use client'

import React, { useState } from 'react'
import { FormField } from './FormField'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Database, User, Lock } from 'lucide-react'

interface DatabaseFormProps {
    onClose: () => void
}

export function DatabaseForm({ onClose }: DatabaseFormProps) {
    const [projectFields, setProjectFields] = useState({
        dbname: '',
        dbuser: '',
        dbpassword: '',
        dbtype: ''
    })

    // Helper function to sanitize input (replace spaces with hyphens)
    const sanitizeInput = (value: string) => {
        return value.replace(/\s+/g, '-').toLowerCase() // Replace spaces and convert to lowercase
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Sanitize the input for all fields
        const sanitizedValue = sanitizeInput(value)

        setProjectFields((prev) => ({ ...prev, [name]: sanitizedValue }))
    }

    const handleSelectChange = (value: string) => {
        // Sanitize the input for select field
        const sanitizedValue = sanitizeInput(value)
        setProjectFields((prev) => ({ ...prev, dbtype: sanitizedValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log('Database deployment created:', projectFields)
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
                <Select value={projectFields.dbtype} onValueChange={handleSelectChange}>
                    <SelectTrigger id="dbtype">
                        <SelectValue placeholder="Select database type" className="border-purple-600 focus:border-purple-700" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2">Create Database Project</Button>
        </form>
    )
}
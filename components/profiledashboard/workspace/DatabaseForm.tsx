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
    // const [createServiceDeployment] = useCreateServiceDeploymentMutation()
    const [projectFields, setProjectFields] = useState({
        dbname: '',
        dbuser: '',
        dbpassword: '',
        dbtype: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProjectFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setProjectFields(prev => ({ ...prev, dbtype: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log('Database service2 deployment created:')
            onClose()
        } catch (error) {
            console.error('Failed to create database service2 deployment:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField icon={Database} label="Database Name" name="dbname" value={projectFields.dbname} onChange={handleInputChange} />
            <FormField icon={User} label="Database User" name="dbuser" value={projectFields.dbuser} onChange={handleInputChange} />
            <FormField
                icon={Lock}
                label="Database Password"
                name="dbpassword"
                type="password"
                value={projectFields.dbpassword}
                onChange={handleInputChange}
            />
            <div className="space-y-2">
                <Label htmlFor="dbtype" className="text-sm font-medium">Database Type</Label>
                <Select value={projectFields.dbtype} onValueChange={handleSelectChange}>
                    <SelectTrigger id="dbtype">
                        <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="w-full">Create Database Project</Button>
        </form>
    )
}


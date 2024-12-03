"use client";

import { useState, useMemo } from "react";
import {
    Plus,
    Trash2,
    Search,
    CheckCircle,
    AlertCircle,
    Globe,
    Edit,
    Copy,
    Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

type Domain = {
    id: number;
    name: string;
    status: 'Active' | 'Pending' | 'Inactive';
    type: 'Primary' | 'Alias' | 'Subdomain';
    verified: boolean;
    createdAt: Date;
};

const initialDomains: Domain[] = [
    {
        id: 1,
        name: 'naktech.pro',
        status: 'Active',
        type: 'Primary',
        verified: true,
        createdAt: new Date('2023-01-15')
    },
    {
        id: 2,
        name: 'test.com',
        status: 'Pending',
        type: 'Alias',
        verified: false,
        createdAt: new Date('2023-06-20')
    },
    {
        id: 3,
        name: 'blogapi.dev',
        status: 'Active',
        type: 'Subdomain',
        verified: true,
        createdAt: new Date('2023-03-10')
    },
];

export default function DomainManagement() {
    const [domains, setDomains] = useState<Domain[]>(initialDomains);
    const [newDomain, setNewDomain] = useState('');
    const [search, setSearch] = useState('');
    const [isAddingDomain, setIsAddingDomain] = useState(false);
    const [editingDomain, setEditingDomain] = useState<Domain | null>(null);

    const filteredDomains = useMemo(() => {
        return domains.filter(domain =>
            domain.name.toLowerCase().includes(search.toLowerCase()) ||
            domain.type.toLowerCase().includes(search.toLowerCase()) ||
            domain.status.toLowerCase().includes(search.toLowerCase())
        );
    }, [domains, search]);

    const addDomain = (e: React.FormEvent) => {
        e.preventDefault();
        if (newDomain) {
            const domainExists = domains.some(domain => domain.name.toLowerCase() === newDomain.toLowerCase());
            if (domainExists) {
                toast({
                    title: "Domain already exists",
                    description: "Please enter a unique domain name.",
                    variant: "destructive"
                });
                return;
            }
            const newDomainObj: Domain = {
                id: domains.length + 1,
                name: newDomain,
                status: 'Pending',
                type: 'Alias',
                verified: false,
                createdAt: new Date()
            };
            setDomains([...domains, newDomainObj]);
            setNewDomain('');
            setIsAddingDomain(false);
            toast({
                title: "Domain added",
                description: `${newDomain} has been added successfully.`,
            });
        }
    };

    const removeDomain = (id: number) => {
        setDomains(domains.filter(domain => domain.id !== id));
        toast({
            title: "Domain removed",
            description: "The domain has been removed successfully.",
        });
    };

    const toggleDomainStatus = (domain: Domain) => {
        setDomains(domains.map(d =>
            d.id === domain.id
                ? {
                    ...d,
                    status: d.status === 'Active' ? 'Inactive' : 'Active'
                }
                : d
        ));
        toast({
            title: "Domain Status Updated",
            description: `${domain.name} is now ${domain.status === 'Active' ? 'Inactive' : 'Active'}.`,
        });
    };

    const copyDomainToClipboard = (domain: string) => {
        navigator.clipboard.writeText(domain);
        toast({
            title: "Domain Copied",
            description: `${domain} has been copied to clipboard.`,
        });
    };

    const editDomain = (domain: Domain) => {
        setEditingDomain(domain);
    };

    const saveEditedDomain = () => {
        if (editingDomain) {
            setDomains(domains.map(d =>
                d.id === editingDomain.id ? editingDomain : d
            ));
            setEditingDomain(null);
            toast({
                title: "Domain Updated",
                description: `${editingDomain.name} has been updated successfully.`,
            });
        }
    };

    return (
        <div className="flex flex-col h-screen p-8 bg-gray-50">
            <div className="flex items-center mb-6">
                <Globe className="text-purple-500 w-8 h-8 mr-2"/>
                <h1 className="text-3xl font-bold text-purple-500">Domain Management</h1>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search domains..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 w-64 focus:border-purple-500 focus:ring-purple-500"
                    />
                </div>

                <Dialog open={isAddingDomain} onOpenChange={setIsAddingDomain}>
                    <DialogTrigger asChild>
                        <Button className="bg-purple-500 hover:bg-purple-700 transition-colors">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Domain
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-purple-500">Add New Domain</DialogTitle>
                            <DialogDescription>
                                Enter the domain you want to add to your project.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={addDomain}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Domain
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newDomain}
                                        onChange={(e) => setNewDomain(e.target.value)}
                                        className="col-span-3 focus:border-purple-500 focus:ring-purple-500"
                                        placeholder="example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-purple-500 hover:bg-purple-700 transition-colors">
                                    Add Domain
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white shadow-md rounded-lg flex-grow overflow-auto">
                <Table>
                    <TableHeader className="bg-purple-50">
                        <TableRow>
                            <TableHead className="text-purple-600">Domain</TableHead>
                            <TableHead className="text-purple-600">Status</TableHead>
                            <TableHead className="text-purple-600">Type</TableHead>
                            <TableHead className="text-purple-600">Created</TableHead>
                            <TableHead className="text-purple-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDomains.map((domain) => (
                            <TableRow key={domain.id} className="hover:bg-purple-50 transition-colors">
                                <TableCell className="font-medium flex items-center">
                                    {domain.name}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-2 text-purple-500 hover:text-purple-700"
                                        onClick={() => copyDomainToClipboard(domain.name)}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={domain.status === 'Active' ? 'default' : 'secondary'}
                                        className={`
                                            ${domain.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            domain.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}
                                        `}
                                    >
                                        {domain.status === 'Active' ? (
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                        ) : domain.status === 'Pending' ? (
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                        )}
                                        {domain.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{domain.type}</TableCell>
                                <TableCell>{domain.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="text-purple-500 hover:text-purple-700">
                                                    <Settings className="h-4 w-4" />
                                                    <span className="sr-only">Domain Actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onSelect={() => copyDomainToClipboard(domain.name)}
                                                    className="cursor-pointer"
                                                >
                                                    <Copy className="mr-2 h-4 w-4" />
                                                    Copy Domain
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onSelect={() => editDomain(domain)}
                                                    className="cursor-pointer"
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Domain
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onSelect={() => toggleDomainStatus(domain)}
                                                    className="cursor-pointer"
                                                >
                                                    <Switch
                                                        checked={domain.status === 'Active'}
                                                        className="mr-2"
                                                    />
                                                    Toggle Status
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onSelect={() => removeDomain(domain.id)}
                                                    className="text-red-600 cursor-pointer focus:text-red-800"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Remove Domain
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Domain Dialog */}
            <Dialog open={!!editingDomain} onOpenChange={() => setEditingDomain(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-purple-500">Edit Domain</DialogTitle>
                        <DialogDescription>
                            Modify the details of the selected domain
                        </DialogDescription>
                    </DialogHeader>
                    {editingDomain && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="editName" className="text-right">
                                    Domain
                                </Label>
                                <Input
                                    id="editName"
                                    value={editingDomain.name}
                                    onChange={(e) => setEditingDomain({
                                        ...editingDomain,
                                        name: e.target.value
                                    })}
                                    className="col-span-3 focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="editType" className="text-right">
                                    Type
                                </Label>
                                <select
                                    id="editType"
                                    value={editingDomain.type}
                                    onChange={(e) => setEditingDomain({
                                        ...editingDomain,
                                        type: e.target.value as Domain['type']
                                    })}
                                    className="col-span-3 p-2 border rounded focus:border-purple-500 focus:ring-purple-500"
                                >
                                    <option value="Primary">Primary</option>
                                    <option value="Alias">Alias</option>
                                    <option value="Subdomain">Subdomain</option>
                                </select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            onClick={saveEditedDomain}
                            className="bg-purple-500 hover:bg-purple-700 transition-colors"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
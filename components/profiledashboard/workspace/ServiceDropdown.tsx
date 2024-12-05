"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const services = [
    {
        value: "service-a",
        label: "Service A",
    },
    {
        value: "service-b",
        label: "Service B",
    },
    {
        value: "service-c",
        label: "Service C",
    },
];

export function ServiceDropdown() {
    const [open, setOpen] = React.useState(false);
    const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

    const toggleService = (value: string) => {
        setSelectedServices((current) =>
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value]
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-purple-300 bg-white text-purple-600 p-4">
                <p className="text-sm text-muted-foreground">Selected services:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedServices.length === 0 ? (
                        <div className="text-sm text-gray-500">No services selected.</div>
                    ) : (
                        selectedServices.map((value) => (
                            <div
                                key={value}
                                className="rounded-md bg-purple-100 px-2 py-1 text-sm text-purple-600"
                            >
                                {services.find((service) => service.value === value)?.label}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between border-purple-500 text-purple-500 hover:bg-purple-100"
                    >
                        {selectedServices.length === 0
                            ? "Select services..."
                            : `${selectedServices.length} service${
                                selectedServices.length === 1 ? "" : "s"
                            } selected`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="center"
                    className="w-full min-w-[--trigger-width] p-0"
                >
                    <Command>
                        <CommandEmpty>No services found.</CommandEmpty>
                        <CommandGroup>
                            {services.map((service) => (
                                <CommandItem
                                    key={service.value}
                                    onSelect={() => toggleService(service.value)}
                                    className="flex items-center gap-2 text-purple-600 hover:bg-purple-100"
                                >
                                    {service.label}
                                    {selectedServices.includes(service.value) && (
                                        <Check className="ml-auto h-4 w-4 text-purple-600" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
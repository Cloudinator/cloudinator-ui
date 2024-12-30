import { useState, useCallback, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings, GripVertical, Loader2, CheckCircle } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUpdateExistingServiceMutation } from "@/redux/api/projectApi"
import {toast} from "@/hooks/use-toast";


interface Service {
    uuid: string;
    name: string;
    git: string;
    branch: string;
    namespace: string;
}

interface ConfigureProjectModalProps {
    services: Service[];
    name: string;
    folder: string;
}

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-move">
            {children}
        </li>
    )
}

export function ConfigureProjectModal({ services, folder, name }: ConfigureProjectModalProps) {
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [open, setOpen] = useState(false);
    const [updateExistingService, { isLoading, isSuccess }] = useUpdateExistingServiceMutation()

    const jobName = name + "-pipeline"

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            setSelectedServices((items) => {
                const oldIndex = items.findIndex((item) => item.uuid === active.id)
                const newIndex = items.findIndex((item) => item.uuid === over?.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }, [])

    const handleServiceSelect = useCallback((serviceUuid: string) => {
        const service = services.find(s => s.uuid === serviceUuid)
        if (service && !selectedServices.some(s => s.uuid === serviceUuid)) {
            setSelectedServices(prevServices => [...prevServices, service])
        }
    }, [selectedServices, services])

    const removeService = useCallback((serviceUuid: string) => {
        setSelectedServices(prevServices => prevServices.filter(s => s.uuid !== serviceUuid))
    }, [])

    const handleUpdate = useCallback(async () => {
        const selectedServiceNames = selectedServices.map(service => service.name);
        console.log('Updating configuration with selected services:', selectedServiceNames);
        try {
            const result = await updateExistingService({
                name: jobName,
                folder: folder,
                servicesNames: selectedServiceNames,
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }finally {
            toast({
                title: "Configuration Updated",
                description: "Your project configuration has been successfully updated.",
                duration: 3000,
            })
            setOpen(false);
        }
    }, [selectedServices, jobName, folder, updateExistingService])

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setOpen(false)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [isSuccess])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => setOpen(true)}>
                    <Settings className="mr-2 h-4 w-4"/> Configure Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4">Configure Project Services</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Select onValueChange={handleServiceSelect} disabled={isLoading}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                            {services.map((service) => (
                                <SelectItem key={service.uuid} value={service.uuid}>
                                    {service.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Selected Services</h3>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={selectedServices.map(s => s.uuid)} strategy={verticalListSortingStrategy}>
                                <ul className="space-y-2">
                                    {selectedServices.map((service) => (
                                        <SortableItem key={service.uuid} id={service.uuid}>
                                            <div className="flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                                <div className="flex items-center space-x-2">
                                                    <GripVertical className="h-5 w-5 text-gray-500" />
                                                    <span className="font-medium text-gray-700">{service.name}</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeService(service.uuid)}
                                                    className="text-red-500 hover:text-red-700"
                                                    disabled={isLoading}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </SortableItem>
                                    ))}
                                </ul>
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button
                        onClick={handleUpdate}
                        className={`${isSuccess ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-90`}
                        disabled={isLoading || isSuccess}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSuccess && <CheckCircle className="mr-2 h-4 w-4" />}
                        {isLoading ? 'Updating...' : isSuccess ? 'Updated!' : 'Update Configuration'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


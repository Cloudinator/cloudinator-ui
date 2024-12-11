import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {AnimatePresence,motion} from "framer-motion";
import {Key} from "lucide-react";

interface FormFieldProps {
    icon: React.ElementType
    label: string
    name: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FormField({ icon: Icon, label, name, type = "text", value, onChange }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="text-sm font-medium">{label}</Label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Icon className="w-5 h-5" />
                </div>
                <Input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="pl-10"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    required
                />
            </div>
        </div>
    )
}

export { FormField }

interface AutomationToggleProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    token: string
    onTokenChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function AutomationToggle({ checked, onCheckedChange, token, onTokenChange }: AutomationToggleProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Switch id="automate" checked={checked} onCheckedChange={onCheckedChange} />
                <Label htmlFor="automate" className="text-sm font-medium">Enable Automation</Label>
            </div>
            <AnimatePresence>
                {checked && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FormField
                            icon={Key}
                            label="Automation Token"
                            name="token"
                            type="password"
                            value={token}
                            onChange={onTokenChange}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { AutomationToggle }
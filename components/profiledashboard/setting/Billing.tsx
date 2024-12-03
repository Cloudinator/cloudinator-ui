import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardSubNavbar from "@/components/navbar/DashboardSubNavbar";

export default function Billing() {
    return (
        <div>
        {/* Top Navigation */}
            <DashboardSubNavbar />
            <div className="px-8 py-4 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Billing Information</CardTitle>
                        <CardDescription>Manage your billing details and subscription.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">Current Plan</h3>
                                <p className="text-sm text-gray-500">Pro Plan - $29/month</p>
                            </div>
                            <Button variant="outline">Change Plan</Button>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                    <span className="text-xs font-bold">VISA</span>
                                </div>
                                <span>Visa ending in 4242</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Billing History</h3>
                            <ul className="space-y-2">
                                <li className="flex justify-between">
                                    <span>Apr 1, 2023</span>
                                    <span>$29.00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Mar 1, 2023</span>
                                    <span>$29.00</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
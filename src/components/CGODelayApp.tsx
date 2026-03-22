import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

export default function CGODelayApp() {
    const [form, setForm] = useState({
        employee: "",
        allocator: "",
        flight: "",
        gate: "",
        date: "",
        skdDep: "",
        actDep: "",
        reason: "",
        staffed: "",
        deviation: "",
        hccError: "",
        ccName: "",
        taskConfirmed: "",
        taskActions: "",
    });

    const [reports, setReports] = useState([]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const calculateTimeLost = (scheduled, actual) => {
        if (!scheduled || !actual) return 0;
        const skd = new Date(`1970-01-01T${scheduled}:00`);
        const act = new Date(`1970-01-01T${actual}:00`);
        return Math.round((act - skd) / 60000);
    };

    const addReport = () => {
        const requiredFields = [
            "employee",
            "allocator",
            "flight",
            "gate",
            "date",
            "skdDep",
            "actDep",
            "reason",
            "staffed",
            "taskConfirmed",
            "ccName",
        ];

        for (const f of requiredFields) {
            if (!form[f]) return;
        }

        const timeLost = calculateTimeLost(form.skdDep, form.actDep);
        setReports([...reports, { ...form, timeLost }]);
        setForm({
            employee: "",
            allocator: "",
            flight: "",
            gate: "",
            date: "",
            skdDep: "",
            actDep: "",
            reason: "",
            staffed: "",
            deviation: "",
            hccError: "",
            ccName: "",
            taskConfirmed: "",
            taskActions: "",
        });
    };

    const flights = ["AA100", "AA245", "AA782", "AA1234"];
    const allocators = ["John Smith", "Maria Lopez", "Chris Taylor", "Alex Johnson"];
    const gates = ["A15", "A28", "B12", "C7", "D23"];

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <motion.h1 className="text-3xl font-bold" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                CGO Delay Reporting App
            </motion.h1>
            <Card className="shadow-lg rounded-2xl">
                <CardContent className="space-y-4 p-6">
                    <h2 className="text-xl font-semibold mb-2">Add Delay Report</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Employee Name" value={form.employee} onChange={(e) => updateField("employee", e.target.value)} />
                        <select className="border rounded p-2" value={form.allocator} onChange={(e) => updateField("allocator", e.target.value)}>
                            <option value="">Select Allocator</option>
                            {allocators.map((a, idx) => (
                                <option key={idx} value={a}>{a}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select className="border rounded p-2" value={form.flight} onChange={(e) => updateField("flight", e.target.value)}>
                            <option value="">Select Flight Number</option>
                            {flights.map((f, idx) => (
                                <option key={idx} value={f}>{f}</option>
                            ))}
                        </select>
                        <select className="border rounded p-2" value={form.gate} onChange={(e) => updateField("gate", e.target.value)}>
                            <option value="">Select Gate</option>
                            {gates.map((g, idx) => (
                                <option key={idx} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} />
                        <Input type="time" value={form.skdDep} onChange={(e) => updateField("skdDep", e.target.value)} />
                        <Input type="time" value={form.actDep} onChange={(e) => updateField("actDep", e.target.value)} />
                    </div>
                    <Textarea placeholder="Describe the delay reason" value={form.reason} onChange={(e) => updateField("reason", e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select className="border rounded p-2" value={form.staffed} onChange={(e) => updateField("staffed", e.target.value)}>
                            <option value="">Was flight staffed to model?</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {form.staffed === "No" && (
                            <Input placeholder="Describe staffing deviation" value={form.deviation} onChange={(e) => updateField("deviation", e.target.value)} />
                        )}
                    </div>
                    <Textarea placeholder="Enter HCC's CGO Error Data" value={form.hccError} onChange={(e) => updateField("hccError", e.target.value)} />
                    <Input placeholder="Crew Chief / Clerk Name" value={form.ccName} onChange={(e) => updateField("ccName", e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select className="border rounded p-2" value={form.taskConfirmed} onChange={(e) => updateField("taskConfirmed", e.target.value)}>
                            <option value="">Was task confirmed?</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {form.taskConfirmed === "No" && (
                            <Input placeholder="What actions were taken?" value={form.taskActions} onChange={(e) => updateField("taskActions", e.target.value)} />
                        )}
                    </div>
                    <Button className="w-full md:w-auto" onClick={addReport}>Submit Delay Report</Button>
                </CardContent>
            </Card>
            {reports.length > 0 && (
                <Card className="shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Submitted Reports</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Allocator</TableHead>
                                    <TableHead>Flight</TableHead>
                                    <TableHead>Gate</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>SKD</TableHead>
                                    <TableHead>ACT</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Staffed?</TableHead>
                                    <TableHead>Deviation</TableHead>
                                    <TableHead>HCC Error</TableHead>
                                    <TableHead>CC/Clerk</TableHead>
                                    <TableHead>Task Confirmed?</TableHead>
                                    <TableHead>Actions</TableHead>
                                    <TableHead>Time Lost</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.map((r, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{r.employee}</TableCell>
                                        <TableCell>{r.allocator}</TableCell>
                                        <TableCell>{r.flight}</TableCell>
                                        <TableCell>{r.gate}</TableCell>
                                        <TableCell>{r.date}</TableCell>
                                        <TableCell>{r.skdDep}</TableCell>
                                        <TableCell>{r.actDep}</TableCell>
                                        <TableCell>{r.reason}</TableCell>
                                        <TableCell>{r.staffed}</TableCell>
                                        <TableCell>{r.deviation}</TableCell>
                                        <TableCell>{r.hccError}</TableCell>
                                        <TableCell>{r.ccName}</TableCell>
                                        <TableCell>{r.taskConfirmed}</TableCell>
                                        <TableCell>{r.taskActions}</TableCell>
                                        <TableCell>{r.timeLost} min</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
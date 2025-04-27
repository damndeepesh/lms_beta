import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { User, Mail, Phone, Calendar, GraduationCap, Building } from 'lucide-react'; // Added more icons

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserCreated?: () => void;
}

// Keep Role enum consistent with backend
export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  FINANCE = "FINANCE",
  MANAGEMENT = "MANAGEMENT",
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, onUserCreated }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [studentId, setStudentId] = useState("");
  const [batch, setBatch] = useState<string>("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when modal opens or closes
  useEffect(() => {
    if (open) {
      setStep(1);
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole(Role.STUDENT);
      setPhoneNumber("");
      setDateOfBirth("");
      setStudentId("");
      setBatch("");
      setDepartment("");
      setError(null);
      setSuccess(null);
      setIsLoading(false);
    } else {
        // Optionally clear fields on close as well
        setSuccess(null);
        setError(null);
    }
  }, [open]);

  if (!open) return null;

  const handleNext = () => {
    setError(null); // Clear previous errors first

    // Validation for Step 1 -> 2
    if (step === 1) {
        if (!firstName || !lastName || !email) {
            setError("Please fill in First Name, Last Name, and Email.");
            return;
        }
    }
    // Validation for Step 2 -> 3
    else if (step === 2) {
        if (!dateOfBirth) {
            setError("Please provide Date of Birth.");
            return;
        }
        // Add more specific validation if needed (e.g., phone number format)
    }

    // If validation passes for the current step, proceed
    setStep(step + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Role specific validation (Final check before submitting)
    if (role === Role.STUDENT && (!batch || !studentId || !department)) {
        setError("Please fill in Batch, Student ID, and Department for students.");
        return;
    }
    if (role === Role.TEACHER && !department) {
        setError("Please fill in Department for teachers.");
        return;
    }
    // Ensure DOB was entered (already validated in handleNext, but a final check is safe)
    if (!dateOfBirth) {
        setError("Date of Birth is required.");
        return;
    }

    setIsLoading(true);
    try {
      const requestBody: any = {
        firstName,
        lastName,
        email,
        role,
        phoneNumber: phoneNumber || null, // Send null if empty
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null, // Send ISO string or null
      };

      // Add role-specific fields
      if (role === Role.STUDENT) {
        requestBody.batch = batch ? parseInt(batch, 10) : null;
        requestBody.studentId = studentId || null;
        requestBody.department = department || null;
      } else if (role === Role.TEACHER) {
        requestBody.department = department || null;
      }

      const response = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create user");
      setSuccess(`User ${data.email} created successfully. Temporary Password: ${data.temporaryPassword}`);
      // Don't reset fields here, useEffect handles it on next open
      if (onUserCreated) onUserCreated();
      // Keep modal open to show success message, user can close manually or via Cancel button
      // onClose(); // Optionally close modal on success
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = 3; // Define total steps

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-lg"> {/* Increased max-width */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create New User (Step {step} of {totalSteps})</CardTitle>
            <CardDescription className="text-center">Enter the details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="user-creation-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="pl-8" placeholder="John" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="pl-8" placeholder="Doe" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="pl-8" placeholder="john.doe@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={value => setRole(value as Role)} required>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Role).map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="pl-8" placeholder="+1 234 567 890" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="dateOfBirth" type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required className="pl-8" />
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Role-Specific Details */}
              {step === 3 && (
                <>
                  {/* Conditionally render fields based on role */}
                  {role === Role.STUDENT && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <div className="relative">
                            <GraduationCap className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="studentId" type="text" value={studentId} onChange={e => setStudentId(e.target.value)} required className="pl-8" placeholder="S12345" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch (Year)</Label>
                        <div className="relative">
                            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="batch"
                                type="number"
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                                placeholder="e.g., 2024"
                                min="1900"
                                max={new Date().getFullYear() + 10}
                                required
                                className="pl-8"
                            />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <div className="relative">
                            <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="department" type="text" value={department} onChange={e => setDepartment(e.target.value)} required className="pl-8" placeholder="Computer Science" />
                        </div>
                      </div>
                    </>
                  )}

                  {role === Role.TEACHER && (
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <div className="relative">
                        <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="department" type="text" value={department} onChange={e => setDepartment(e.target.value)} required className="pl-8" placeholder="Physics" />
                      </div>
                    </div>
                  )}

                  {(role !== Role.STUDENT && role !== Role.TEACHER) && (
                      <p className="text-sm text-muted-foreground text-center">No role-specific information required for {role}.</p>
                  )}
                </>
              )}

              {error && <p className="text-red-500 text-sm font-medium text-center mt-2">Error: {error}</p>}
              {success && <p className="text-green-600 text-sm font-medium text-center mt-2">Success: {success}</p>}

              {/* Navigation Buttons - Handled in CardFooter */}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 pt-4 border-t">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="w-1/3">Back</Button>
            )}
            {step < totalSteps && (
              <Button onClick={handleNext} className={`w-1/3 ${step === 1 ? 'ml-auto' : ''}`}>Next</Button> // Adjust width and margin
            )}
            {step === totalSteps && (
              <Button type="submit" form="user-creation-form" disabled={isLoading} className="w-1/3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            )}
            <Button variant="ghost" onClick={onClose} className="w-1/3">Cancel</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateUserModal;
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { User, Mail } from "lucide-react";

export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  FINANCE = "FINANCE",
  MANAGEMENT = "MANAGEMENT",
}

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
  onUserCreated?: () => void;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, onUserCreated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [batch, setBatch] = useState<string>(""); // Add state for batch
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      // Include batch only if role is STUDENT and batch is provided
      const requestBody: any = { firstName, lastName, email, role };
      if (role === Role.STUDENT && batch) {
        requestBody.batch = parseInt(batch, 10); // Ensure batch is sent as a number
      }

      const response = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create user");
      setSuccess(`User ${data.email} created successfully. Temporary Password: ${data.temporaryPassword}`);
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole(Role.STUDENT);
      setBatch(""); // Clear batch field on success
      if (onUserCreated) onUserCreated();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-md">
        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create New User</CardTitle>
            <CardDescription className="text-center">Enter the details below to create a new user account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Conditionally render Batch input for STUDENT role */}
              {role === Role.STUDENT && (
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch (Year)</Label>
                  <Input
                    id="batch"
                    type="number" // Use number input for year
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="e.g., 2024"
                    min="1900" // Optional: set a reasonable minimum year
                    max={new Date().getFullYear() + 5} // Optional: set a reasonable maximum year
                  />
                </div>
              )}

              {error && <p className="text-red-500 text-sm font-medium">Error: {error}</p>}
              {success && <p className="text-green-600 text-sm font-medium">Success: {success}</p>}
              <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button variant="outline" onClick={onClose} className="w-full">Cancel</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateUserModal;
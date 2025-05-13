"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/profile")}>
                Manage Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Add, edit, or remove projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/projects")}>
                Manage Projects
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Manage your certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/certifications")}>
                Manage Certifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
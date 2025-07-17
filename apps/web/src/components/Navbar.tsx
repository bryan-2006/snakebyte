'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { Terminal, Code, LogOut } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Terminal className="h-8 w-8 text-green-400" />
            <span className="font-mono text-xl">SnakeByte</span>
            <span className="text-green-400 font-mono">&gt;_</span>
          </Link>
          
          {/* Right side - Navigation & Auth */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
            </div>
            
            {status === 'loading' ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">
                  Welcome, {session.user?.name}
                </span>
                <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button onClick={() => signIn('google')} className="bg-green-600 hover:bg-green-700">
                <Code className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
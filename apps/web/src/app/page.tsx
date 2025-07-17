"use client";

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Terminal, Code2, Zap, Shield, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [terminalText, setTerminalText] = useState('');
  const fullText = 'Welcome to SnakeByte - Where Code Meets Adventure!';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              { //<Terminal className="h-16 w-16 text-green-400 mx-auto mb-4" />
              }
              <div className="bg-black/50 border border-green-400/30 rounded-lg p-4 font-mono text-left max-w-2xl mx-auto">
                <div className="flex items-center mb-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-4 text-muted-foreground"><Terminal/></span>
                </div>
                <div className="text-green-400">
                  <span className="text-green-500">student@snakebyte:~$</span> {terminalText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl mb-6">
              Learn <span className="text-green-400">Programming</span>
              <br />
              Like a <span className="font-mono text-green-400">Hacker</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of young coders mastering Python, JavaScript, and more through 
              interactive challenges, real-world projects, and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Code2 className="mr-2 h-5 w-5" />
                  Start Coding
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">Why Choose SnakeByte?</h2>
            <p className="text-xl text-muted-foreground">
              We make programming accessible, engaging, and fun for young minds
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/50 border-green-400/20">
              <Terminal className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl mb-2">Interactive Terminal</h3>
              <p className="text-muted-foreground">
                Learn real programming skills with our browser-based terminal and code editor
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 border-green-400/20">
              <Zap className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl mb-2">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Get immediate results and hints as you code, making learning faster and more engaging
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 border-green-400/20">
              <Shield className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl mb-2">Safe Environment</h3>
              <p className="text-muted-foreground">
                Kid-friendly platform with secure coding environments and parental controls
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl mb-4">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of young programmers and unlock your potential
          </p>
          <Link href="/courses">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
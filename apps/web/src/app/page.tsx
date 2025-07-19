"use client";

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { signIn } from 'next-auth/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Terminal, Zap, Shield, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [terminalText, setTerminalText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const asciiArt = `███████╗███╗   ██╗ █████╗ ██╗  ██╗███████╗
██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██╔════╝
███████╗██╔██╗ ██║███████║█████╔╝ █████╗  
╚════██║██║╚██╗██║██╔══██║██╔═██╗ ██╔══╝  
███████║██║ ╚████║██║  ██║██║  ██╗███████╗
╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                          
██████╗ ██x ▔ x██╗████████╗███████╗       
██╔══██╗╚█▓▃⅄▃▓█╔╝╚══██╔══╝██╔════╝       
██████╔╝ ╚█▓▒▓█╔╝    ██║   █████╗         
██╔══██╗  ╚▓▒▓╔╝     ██║   ██╔══╝         
██████╔╝   ▓▒▓║      ██║   ███████╗       
╚═════╝    ╚═╝       ╚═╝   ╚══════╝       

Welcome to SnakeByte - Where Code Meets Adventure!`;

  const commands = [
    { cmd: 'login', description: 'Sign in to see your courses', path: '' },
    { cmd: 'courses', description: 'Enrolled & available programs', path: '/courses' },
    { cmd: 'about', description: 'Learn more about SnakeByte', path: '' },
    { cmd: 'contact-us', description: 'Reach out to us', path: '' },
  ];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < asciiArt.length) {
        setTerminalText(asciiArt.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowOptions(true), 500);
      }
    }, 5);

    return () => clearInterval(timer);
  }, []);

    const handleCommandClick = (cmd: string) => {
    switch (cmd) {
      case 'login':
        signIn('google');
        break;
      case 'courses':
        router.push('/courses');
        break;
      case 'about':
        break;
      case 'contact-us':
        break;
      default:
        break;
    }
    
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Terminal */}
      <section className="relative py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            {/* {<Terminal className="h-12 w-12 lg:h-16 lg:w-16 text-green-400 mx-auto mb-6" />} */}
            
            {/* Large Responsive Terminal */}
            <div className="bg-black/90 border-2 border-green-400/50 rounded-lg p-4 lg:p-8 font-mono text-left max-w-5xl mx-auto shadow-2xl shadow-green-400/20">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-muted-foreground text-sm lg:text-base">&gt;_ snakebyte</span>
              </div>
              
              <div className="text-green-400 min-h-[300px] lg:min-h-[530px]">
                <div className="mb-4">
                  <span className="text-green-500 text-sm lg:text-base">student@snakebyte:~$</span>
                  <span className="ml-2 text-sm lg:text-base">./welcome.py</span>
                </div>
                
                <pre className="text-green-400 text-xs sm:text-sm lg:text-base leading-tight whitespace-pre-wrap overflow-x-auto">
                  {terminalText}
                  {terminalText.length < asciiArt.length && <span className="animate-pulse">█</span>}
                </pre>
                
                {showOptions && (
                  <div className="mt-6 space-y-2 animate-fade-in">
                    {commands.map((command, index) => (
                      <div 
                        key={index}
                        className="flex items-center hover:bg-green-400/10 p-2 rounded cursor-pointer transition-colors"
                        onClick={() => handleCommandClick(command.cmd)}>
                        <span className="ml-2 text-sm lg:text-base">&gt;&gt;&gt;</span>
                        <span className="ml-2 text-cyan-400 text-sm lg:text-base">{command.cmd}</span>
                        <span className="ml-4 text-gray-400 text-sm lg:text-base">// {command.description}</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-green-400/30">
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm lg:text-base">student@snakebyte:~$</span>
                        <span className="ml-2 text-sm lg:text-base animate-pulse">█</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join other coders mastering programming through 
              interactive challenges, fun projects, and expert guidance.
            </p>
{/*             
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
            </div> */}
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
              <h3 className="text-xl mb-2">Hands-On Experience</h3>
              <p className="text-muted-foreground">
                Learn to code by by using real programming langauges used by industry professionals
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 border-green-400/20">
              <Zap className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl mb-2">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Get immediate feedback and guidance from your personal tutor, making learning faster and more engaging
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 border-green-400/20">
              <Shield className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl mb-2">Safe Environment</h3>
              <p className="text-muted-foreground">
                Kid-friendly environment with ability to opt in for regular updates on your child's progress
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
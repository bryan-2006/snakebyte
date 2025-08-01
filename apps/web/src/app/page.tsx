"use client";

import Link from "next/link";
import React, { useState} from 'react';
import { useRouter } from 'next/navigation'; 
import { signIn } from 'next-auth/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { SquareTerminal, Terminal, Zap, Shield, ArrowRight, BookOpenText, Mail } from 'lucide-react';

export default function HomePage() {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  // Include commands in ASCII art for typing effect
  const asciiLines = [
    "███████╗███╗   ██╗ █████╗ ██╗  ██╗███████╗",
    "██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██╔════╝",
    "███████╗██╔██╗ ██║███████║█████╔╝ █████╗  ",
    "╚════██║██║╚██╗██║██╔══██║██╔═██╗ ██╔══╝  ",
    "███████║██║ ╚████║██║  ██║██║  ██╗███████╗",
    "╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝",
    "                                          ",
    "██████╗ ██x ▔ x██╗████████╗███████╗       ",
    "██╔══██╗╚█▓▃⅄▃▓█╔╝╚══██╔══╝██╔════╝       ",
    "██████╔╝ ╚█▓▒▓█╔╝    ██║   █████╗         ",
    "██╔══██╗  ╚▓▒▓╔╝     ██║   ██╔══╝         ",
    "██████╔╝   ▓▒▓║      ██║   ███████╗       ",
    "╚═════╝    ╚═╝       ╚═╝   ╚══════╝       ",
    "",
    "Welcome to SnakeByte! Start your journey as a coder :)",
    "",
    ">>> login",
    "// Sign in to see your courses",
    "",
    ">>> courses", 
    "// Enrolled & available programs",
    "",
    ">>> about us",
    "// Learn more and get in contact with us",
    "",
    ">>> contact-us",
    "// Reach out to us",
    "",
    "student@snakebyte:~$ "
  ];

  // Show cursor after all typing is done
  React.useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true)); // After all lines complete
    return () => clearTimeout(timer);
  }, []);

  const handleCommandClick = (cmd: string) => {
    switch (cmd) {
      case 'login':
        signIn('google');
        break;
      case 'courses':
        router.push('/courses');
        break;
      case 'about us':
        break;
      case 'contact-us':
        router.push('/contact');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Add custom CSS */}
      <style jsx>{`
        .typewriter-line {
          overflow: hidden;
          white-space: pre;
          font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
          animation: typing var(--duration) steps(var(--steps), end) var(--delay) both;
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .command-line {
          cursor: pointer;
        }

        .command-line:hover {
          background-color: rgba(0, 255, 170, 0.1);
          border-radius: 4px;
          padding: 0px 2px;
        }
      `}</style>

      <div className="min-h-screen">
        {/* Hero Section with Terminal */}
        <section className="relative py-8 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              {/* Large Responsive Terminal */}
              <div className="bg-black/90 border-2 border-green-400/50 rounded-lg p-4 lg:p-8 font-mono text-left max-w-5xl mx-auto shadow-2xl shadow-green-400/20">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-4 text-muted-foreground lg:text-base">
                    <SquareTerminal />
                  </span>
                </div>
                
                <div className="text-green-400 min-h-[300px] lg:min-h-[530px]">
                  <div className="mb-4">
                    <span className="text-green-500 text-sm lg:text-base">student@snakebyte:~$</span>
                    <span className="ml-2 text-sm lg:text-base">./welcome.py</span>
                  </div>
                  
                  <div className="text-green-400 text-xs sm:text-sm lg:text-base leading-tight font-mono">
  {asciiLines.map((line, index) => {
    // Determine line styling and click handler
    let lineClass = "typewriter-line";
    let textColor = "text-green-400";
    let clickHandler = undefined;
    
    if (line.startsWith(">>>")) {
      lineClass += " command-line";
      textColor = "text-cyan-400";
      const cmd = line.replace(">>> ", "");
      clickHandler = () => handleCommandClick(cmd);
    } else if (line.startsWith("//")) {
      textColor = "text-gray-400";
    } else if (line.startsWith("Welcome")) {
      textColor = "text-yellow-400";
    } else if (line.startsWith("student@")) {
      textColor = "text-green-500";
    }
    
    // Special handling for the last line (student@snakebyte:~$)
    if (line.startsWith("student@")) {
      return (
        <div
          key={index}
          className={`${lineClass} ${textColor}`}
          onClick={clickHandler}
          style={{
            '--steps': line.length || 1,
            '--duration': `${Math.max(line.length * 0.025, 0.15)}s`,
            '--delay': `${index * 0.12}s`,
            display: 'inline-block' // Make it inline so cursor can follow
          } as React.CSSProperties}
        >
          {line}
          {showOptions && (
            <span 
              className="text-green-500"
              style={{ animation: 'blink 1s infinite' }}
            >
              █
            </span>
          )}
        </div>
      );
    }
    
    // Regular rendering for other lines
    return (
      <div
        key={index}
        className={`${lineClass} ${textColor}`}
        onClick={clickHandler}
        style={{
          '--steps': line.length || 1,
          '--duration': `${Math.max(line.length * 0.025, 0.15)}s`,
          '--delay': `${index * 0.12}s`
        } as React.CSSProperties}
      >
        {line || '\u00A0'}
      </div>
    );
  })}
</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join other coders mastering programming through 
                interactive challenges, fun projects, and expert guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl mb-4">Why Choose SnakeByte?</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 bg-card/50 border-green-400/20">
                <Terminal className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl mb-2">Hands-On Experience</h3>
                <p className="text-muted-foreground">
                  Learn to code by by using real programming langauges used by industry professionals
                </p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-green-400/20">
                <Zap className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl mb-2">Quality Feedback</h3>
                <p className="text-muted-foreground">
                  Get feedback and guidance from your personal tutor, making learning faster and more engaging
                </p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-green-400/20">
                <Shield className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl mb-2">Safe Environment</h3>
                <p className="text-muted-foreground">
                  Kid-friendly environment with ability to opt in for regular updates on your child&apos;s progress
                </p>
              </Card>
            </div>
            
            <div className="text-center mb-16 flex flex-col items-center gap-6">
  <p className="text-xl text-muted-foreground mb-4 max-w-2xl">
    We make programming accessible, engaging, and fun for young minds
  </p>
<div className="flex flex-wrap justify-center gap-4">
  <Link href="/about">
    <Button
      size="lg"
      className="bg-green-600 hover:bg-green-700 min-w-[120px]"
    >
      About Us
      <BookOpenText className="ml-2 h-5 w-5" />
    </Button>
  </Link>
  <Link href="/contact">
    <Button
      size="lg"
      className="bg-green-600 hover:bg-green-700 min-w-[120px]"
    >
      Contact Us
      <Mail className="ml-2 h-5 w-5" />
    </Button>
  </Link>
</div>
</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl mb-7">Ready to Start Your Coding Journey?</h2>
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
    </>
  );
}
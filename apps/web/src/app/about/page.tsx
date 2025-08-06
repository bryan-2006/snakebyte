"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Mail, Sparkles, Users, ShieldCheck, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-black/30">
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col gap-12">

          {/* Mission (text left, heading right on desktop) */}
          <div className="relative flex flex-col md:flex-row items-center md:items-stretch px-4 py-8 rounded-xl bg-card/60 border border-green-400/20 shadow-lg animate-fade-in min-h-[180px]">
            {/* Heading first on mobile, right on desktop */}
            <div className="w-full md:w-auto flex-1 flex flex-col justify-center items-end order-1 md:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 md:mb-0 md:ml-8 md:text-right md:pr-8 pt-2 md:pt-0">
                Our Mission
              </h2>
            </div>
            <div className="w-full md:w-auto flex-[2] flex flex-col justify-center order-2 md:order-1 text-right">
              <p className="text-xl text-muted-foreground mb-2 max-w-3xl">
                At <span className="text-green-400 font-semibold">SnakeBytes</span>, students are empowered to learn programming through fun, interactive lessons that spark creativity and build real-world skills for tomorrow&apos;s world.
              </p>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Founded by students for students, SnakeBytes is built on teaching kids to code easily based off of instructor experience.
              </p>
            </div>
          </div>

          {/* What Makes Us, Us (heading left, text right on desktop) */}
          <div className="relative flex flex-col md:flex-row items-center md:items-stretch px-4 py-8 rounded-xl bg-card/60 border border-green-400/20 shadow-lg animate-fade-in min-h-[180px]" style={{ animationDelay: "0.2s" }}>
            {/* Heading first on mobile, left on desktop */}
            <div className="w-full md:w-auto flex-1 flex flex-col justify-center items-start order-1 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 md:mb-0 md:mr-8 md:text-left md:pl-8 pt-2 md:pt-0">
                With a Focus On...
              </h2>
            </div>
            <div className="flex-[2] flex flex-col justify-center order-1 md:order-2 ml-4 mr-6">
              <ul className="text-xl text-muted-foreground mb-0 max-w-3xl space-y-3 text-left">
                <li className="flex items-center gap-2 ml-4"><Users className="text-green-400 h-6 w-5 mr-4" /><span>Community: Connect with peers and foster collaboration</span></li>
                <li className="flex items-center gap-2 ml-4"><BookOpen className="text-green-400 h-6 w-6 mr-4" /><span>Hand&apos;s-On Experience: Dive into real programming languages and projects</span></li>
                <li className="flex items-center gap-2 ml-4"><Sparkles className="text-green-400 h-6 w-6 mr-4" /><span>Easy to Follow Curriculums: Designed by educators, inspired by real journeys</span></li>
                <li className="flex items-center gap-2 ml-4"><ShieldCheck className="text-green-400 h-6 w-6 mr-4" /><span>Digital Safety: Digital literacy and online safety are woven into classes</span></li>
              </ul>
            </div>
          </div>

          {/* FAQ Section (heading right on desktop) */}
          <div className="relative flex flex-col md:flex-row items-center md:items-stretch px-4 py-8 rounded-xl bg-card/60 border border-green-400/20 shadow-lg animate-fade-in min-h-[180px]" style={{ animationDelay: "0.4s" }}>
            {/* Heading first on mobile, right on desktop */}
            <div className="w-full md:w-auto flex-1 flex flex-col justify-center items-end order-1 md:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 md:mb-0 md:ml-8 md:text-right md:pr-8 pt-2 md:pt-0">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="w-full md:w-auto flex-[2] flex flex-col justify-center order-2 md:order-1">
              <div className="max-w-3xl text-right ml-4space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-green-400">Who can join SnakeBytes?</h3>
                  <p className="text-muted-foreground">Aimed towards kids, preteens and teens! Check out recommended age listed underneath courses. Be aware of prerequisites for certain courses. Use your judgment when enrolling or reach out to us for guidance.</p>
                  <br />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-400">What languages do you teach?</h3>
                  <p className="text-muted-foreground">Depends on the class you enrolled in. Each class has a different focus and may cover various programming languages. More classes with more content coming soon!</p>
                  <br />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-400">When do clases run?</h3>
                  <p className="text-muted-foreground">Classes take place in during break of regular school. This can be summer, winter, or spring break; look at the individual course information or reach out for more information. </p>
                  <br />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-400">How do I get started?</h3>
                  <p className="text-muted-foreground">Just log in and checkout your course to enroll. Or <Link href="/contact" className="text-green-400 hover:underline">contact us</Link> if you are having issues.</p>
                  <br />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-400">What can be expected from us and the student?</h3>
                  <p className="text-muted-foreground">We provide a structured curriculum, resources, and support. Students are expected to engage in discussions, complete assignments, collaborate with peers, take part in activities, and seek help when needed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section (heading left on desktop) */}
          <div className="relative flex flex-col md:flex-row items-center md:items-stretch px-4 py-8 rounded-xl bg-card/60 border border-green-400/20 shadow-lg animate-fade-in min-h-[140px]" style={{ animationDelay: "0.6s" }}>
            {/* Heading first on mobile, left on desktop */}
            <div className="w-full md:w-auto flex-1 flex flex-col justify-center items-start order-1 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 md:mb-0 md:mr-8 md:text-left md:pl-8 pt-2 md:pt-0">
                Reach Out!
              </h2>
            </div>
            <div className="w-full md:w-auto flex-[2] flex flex-col justify-center order-2 md:order-2">
              <p className="text-xl text-muted-foreground mb-4 max-w-3xl ml-8 mr-6">
                Got more questions or want to learn more about our programs? Reach out to us!
              </p>
              <p className="text-xl text-muted-foreground mb-4 max-w-3xl ml-8 mr-6">
                Email: <a href="mailto:snakebytes.help@gmail.com" className="text-green-400 hover:underline">snakebytes.help@gmail.com</a>
              </p>
              <p className="text-xl text-muted-foreground mb-4 max-w-3xl ml-8 mr-6">
                Or fill out our contact form (provide a phone number if you&apos;d like a call back):
              </p>
              <Link href="/contact" className="ml-8">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 min-w-[160px] shadow-md mt-2"
                >
                  Contact Us
                  <Mail className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
}
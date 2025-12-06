import Link from 'next/link';
import { templates } from '@/lib/templates';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ResumePreview from '@/components/editor/ResumePreview';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-muted/40">
      <div className="w-full bg-background shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <h1 className="font-headline text-2xl font-bold text-primary">
            ResumeForge AI
          </h1>
          <p className="text-sm text-muted-foreground">Choose a template to begin</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h2 className="font-headline text-4xl font-bold">Find Your Perfect Resume</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Select from our professionally designed templates to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <Link href={`/editor/${template.id}`} key={template.id} className="group block">
              <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl">
                <div 
                  className="overflow-hidden"
                  style={{ 
                    height: '420px', // A fixed height for all previews
                  }}
                >
                  <div
                    className="origin-top-left"
                    style={{
                      transform: 'scale(0.35)', // Uniformly scale the preview
                      width: '210mm', // A4 width
                      height: '297mm', // A4 height
                    }}
                  >
                    <ResumePreview
                      data={template.data}
                      style={template.style}
                      initialData={template.data}
                      isPreview
                    />
                  </div>
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-headline text-xl font-bold text-center">{template.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
       <footer className="w-full py-6 mt-auto bg-background border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ResumeForge AI. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

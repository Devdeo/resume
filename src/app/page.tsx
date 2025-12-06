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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <Link href={`/editor/${template.id}`} key={template.id}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-[1/1.414] w-full overflow-hidden">
                    <div className="pointer-events-none">
                       <ResumePreview
                          data={template.data}
                          style={template.style}
                          initialData={template.data}
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <h3 className="font-headline text-2xl font-bold">{template.name}</h3>
                        <Button variant="secondary" className="mt-4">
                          Use Template <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

import { Satellite } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background/50 py-6 backdrop-blur-sm md:py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Hi Tracker. All rights reserved
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-end">
          <a
            href="https://www.youtube.com/watch?v=Hj1XwNjvkDE"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-center hover:text-foreground hover:underline underline-offset-4"
          >
            <Satellite className="h-4 w-4" />
            ISS Live View (NASA)
          </a>
        </div>
      </div>
    </footer>
  );
}

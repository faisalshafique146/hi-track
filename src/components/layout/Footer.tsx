import { Satellite } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm py-6 md:py-8 mt-auto">
      <div className="container px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Hi Tracker. All rights reserved
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a
            href="https://www.youtube.com/watch?v=Hj1XwNjvkDE"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-foreground underline-offset-4 hover:underline"
          >
            <Satellite className="h-4 w-4" />
            ISS Live View (NASA)
          </a>
        </div>
      </div>
    </footer>
  );
}

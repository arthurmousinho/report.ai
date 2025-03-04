import { ProductsTable } from "@/components/products-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GithubIcon, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-10 space-y-6">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles />
          report.ai
        </h1>
        <a 
          href="https://github.com/arthurmousinho/report.ai" 
          target="_blank" className={cn(buttonVariants({ variant: "outline" }))}
        >
          <GithubIcon size={20} />
          Repository
        </a>
      </header>
      <ProductsTable />
    </div>
  );
}
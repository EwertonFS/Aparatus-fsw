"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado com sucesso!");
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="rounded-full">
      Copiar
    </Button>
  );
};

export default CopyButton;

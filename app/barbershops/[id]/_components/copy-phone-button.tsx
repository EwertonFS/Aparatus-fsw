"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CopyPhoneButtonProps {
  phone: string;
}

const CopyPhoneButton = ({ phone }: CopyPhoneButtonProps) => {
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    toast.success("Telefone copiado com sucesso!");
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopyPhone}>
      Copiar
    </Button>
  );
};

export default CopyPhoneButton;

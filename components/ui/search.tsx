import { SearchIcon } from "lucide-react";
import { Button } from "./button";

const Search = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Campo de Pesquisa (Simulado) */}
      <div className="flex flex-1 items-center gap-3 rounded-full border px-4 py-3">
        <p className="text-muted-foreground text-sm">
          Pesquise serviços ou barbearias
        </p>
      </div>

      {/* Botão de Busca */}
      <Button
        size="icon"
        className="h-11 w-11 rounded-full bg-[#305c3a] hover:bg-[#305c3a]/90"
      >
        <SearchIcon size={20} className="text-white" />
      </Button>
    </div>
  );
};

export default Search;

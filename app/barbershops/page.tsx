import { searchBarbershops } from "@/data/barbershops";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BarbershopItem from "@/components/barbershop-item";
import { PageContainer } from "@/components/ui/page";
import QuickSearch from "@/components/quick-search";

interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search } = await searchParams;

  const barbershops = search ? await searchBarbershops(search) : [];

  return (
    <div>
      <Header />
      <PageContainer>
        <div className="flex flex-col gap-4 px-5 py-6">
          <QuickSearch />
        </div>

        <div className="px-5 pb-6">
          <h1 className="text-muted-foreground mb-3 text-xs font-bold uppercase">
            Resultados para &quot;{search || ""}&quot;
          </h1>

          {barbershops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhuma barbearia encontrada para sua busca.
            </p>
          )}
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default BarbershopsPage;

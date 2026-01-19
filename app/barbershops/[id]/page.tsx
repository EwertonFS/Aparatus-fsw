import { getBarbershopById } from "@/data/barbershops";
import { notFound } from "next/navigation";
import BarbershopDetailsHeader from "./_components/barbershop-details-header";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "@/components/service-item";
import CopyPhoneButton from "./_components/copy-phone-button";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";

interface BarbershopPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <BarbershopDetailsHeader barbershop={barbershop} />

      <BarbershopInfo barbershop={barbershop} />

      <PageContainer>
        <PageSectionContent>
          <PageSectionTitle>Sobre Nós</PageSectionTitle>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {barbershop.description}
          </p>
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Serviços</PageSectionTitle>
          <div className="flex flex-col gap-3">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Contatos</PageSectionTitle>
          <div className="flex flex-col gap-3">
            {barbershop.phones.map((phone) => (
              <div
                key={phone}
                className="border-border bg-card flex items-center justify-between rounded-xl border p-4 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-black">{phone}</p>
                </div>
                <CopyPhoneButton phone={phone} />
              </div>
            ))}
          </div>
        </PageSectionContent>
      </PageContainer>
    </div>
  );
};

export default BarbershopPage;

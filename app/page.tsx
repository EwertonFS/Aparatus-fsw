import {
  PageContainer,
  PageSectionContent,
  PageSectionScroller,
  PageSectionTitle,
} from "@/components/ui/page";
import Header from "@/components/header";
import QuickSearch from "@/components/ui/quick-search";
import Image from "next/image";
import Footer from "@/components/footer";
import { getBarbershops, getPopularBarbershops } from "@/data/barbershops";
import BarbershopItem from "@/components/barbershop-item";
import banner from "@/public/banner.png";
import BookingItem from "@/components/booking-item";
import Search from "@/components/ui/search";

export default async function Home() {
  const barbershops = await getBarbershops();

  const popularBarbershops = await getPopularBarbershops();

  // const { confirmedBookings } = await getUserBookings();

  return (
    <div>
      <Header />
      <PageContainer>
        <div className="flex w-full flex-col gap-4 px-5 pb-4">
          <Search />
          <QuickSearch />
        </div>
        <Image
          src={banner}
          alt="Agende nos melhores com a Aparatus"
          sizes="100vw"
          className="h-auto w-full"
        />
        {/* composition patern */}
        {/* {confirmedBookings.length > 0 && ( */}
        <PageSectionContent>
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          <BookingItem />

          <PageSectionScroller>
            {/* {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))} */}
            Agendamentos
          </PageSectionScroller>
        </PageSectionContent>
        {/* // )} */}
        <PageSectionContent>
          <PageSectionTitle>Barbearias</PageSectionTitle>
          <PageSectionScroller>
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
        <PageSectionContent>
          <PageSectionTitle>Barbearias populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
      </PageContainer>
      <Footer />
    </div>
  );
}

import Section from "~/components/common/section/Section";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import SelectDialog from "~/components/dialog/SelectDialog";
import {
  Card,
  CardDescription,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import { Avatar } from "~/components/ui/avatar";
import { MapPin } from "lucide-react";
import SectionContent from "./SectionContent";

export default function DeliveryInformation() {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle
          className='text-xl'
          level='h2'
          title='Szállítási információ'
        />
      </SectionHeader>
      <SectionContent className='flex flex-col gap-16' layoutType='default'>
        <div className='flex flex-col gap-8'>
          <div className='flex gap-1.5'>
            <div>Ingyenesen átvehető:</div>
            <SelectDialog
              trigger={"4 üzlet"}
              title={"Üzlet"}
              description={"Válassz üzletet"}
            />
          </div>

          <div className='flex flex-col gap-4'>
            <Card className='flex items-center gap-4 border p-4 shadow-none'>
              <Avatar className='h-14 w-14 items-center justify-center bg-primary'>
                <MapPin className='h-7 w-7 text-color-primary-foreground' />
              </Avatar>
              <div>
                <CardTitle className='text-base'>
                  Személyes átvétel üzletünkben:
                </CardTitle>
                <CardDescription className='flex gap-1.5 text-base'>
                  Budapest (1203, Határ út 38.) Csütörtökönként 14:00-tól
                  <SelectDialog
                    trigger={"Megváltoztat"}
                    title={"Átvétel"}
                    description={"Válassz átvételi pontot"}
                  />
                </CardDescription>
              </div>
            </Card>
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <div className='flex gap-1.5'>
            <div>Szállítás ide:</div>
            <SelectDialog
              trigger={"Budapest, 1103"}
              title={"Átvétel"}
              description={"Budapest, 1103"}
            />
          </div>

          <div className='flex flex-col gap-4'>
            <Card className='flex items-center gap-4 border p-4 shadow-none'>
              <Avatar className='h-14 w-14 items-center justify-center bg-primary'>
                <MapPin className='h-7 w-7 text-color-primary-foreground' />
              </Avatar>
              <div>
                <CardTitle className='flex gap-1.5 text-base'>
                  Foxpost: 1.490 Ft
                  <SelectDialog
                    trigger={"Megváltoztat"}
                    title={"Átvétel"}
                    description={"Válassz átvételi pontot"}
                  />
                </CardTitle>
                <CardDescription className='text-base'>
                  Várható szállítási időpont ha 17:00-ig megrendeli:
                  2023.10.20.-30. között
                </CardDescription>
              </div>
            </Card>

            <Card className='flex items-center gap-4 border p-4 shadow-none'>
              <Avatar className='h-14 w-14 items-center justify-center bg-primary'>
                <MapPin className='h-7 w-7 text-color-primary-foreground' />
              </Avatar>
              <div>
                <CardTitle className='flex gap-1.5 text-base'>
                  Postapont: 2.000 Ft
                  <SelectDialog
                    trigger={"Megváltoztat"}
                    title={"Átvétel"}
                    description={"Válassz átvételi pontot"}
                  />
                </CardTitle>
                <CardDescription className='text-base'>
                  Várható szállítási időpont ha 17:00-ig megrendeli:
                  2023.10.20.-30. között
                </CardDescription>
              </div>
            </Card>

            <Card className='flex items-center gap-4 border p-4 shadow-none'>
              <Avatar className='h-14 w-14 items-center justify-center bg-primary'>
                <MapPin className='h-7 w-7 text-color-primary-foreground'></MapPin>
              </Avatar>
              <div>
                <CardTitle className='flex gap-1.5 text-base'>
                  Egyedi kiszállítás telephelyről: ingyenes
                </CardTitle>
                <CardDescription className='text-base'>
                  Várható szállítási időpont ha 17:00-ig megrendeli:
                  2023.10.20.-30. között
                </CardDescription>
              </div>
            </Card>
          </div>
        </div>
      </SectionContent>
    </Section>
  );
}

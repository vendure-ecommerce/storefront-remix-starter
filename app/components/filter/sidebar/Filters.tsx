import { Combobox } from "~/components/common/Combobox";
import CheckboxGroup from "~/components/common/checkbox/CheckboxGroup";
import CheckboxGroupItem from "~/components/common/checkbox/CheckboxGroupItem";
import CheckboxGroupRatingItem from "~/components/common/checkbox/CheckboxGroupRatingItem";
import RemoveChip from "~/components/common/chips/RemoveChip";
import SelectChip from "~/components/common/chips/SelectChip";
import { Input } from "~/components/ui-custom/MyInput";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupRatingItem,
} from "~/components/ui-custom/MyRadioGroup";
import { Slider } from "~/components/ui-custom/MySlider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Label } from "~/components/ui/label";
import { Search } from "lucide-react";
import FilterBlock from "./FilterBlock";
import FilterBlockContent from "./FilterBlockContent";
import FilterBlockHeader from "./FilterBlockHeader";

const Filters: React.FC = () => {
  /* const filterChipsOptions = dummy.filterChipsOptions;
  const checkboxOptions = dummy.checkboxOptions;
  const radioOptions = dummy.radioOptions;
  const checkboxRatingOptions = dummy.checkboxRatingOptions;
  const radioRatingOptions = dummy.radioRatingOptions;
  const selectChipOptions = dummy.selectChipOptions; */

  return (
    <div>
      <FilterBlock>
        <FilterBlockHeader
          showFilterIcon={true}
          showBadge={false}
          badgeText='2 db'
          showChevron={false}
          title='Aktív szűrőfeltételek'
        />
        <FilterBlockContent className='px-3 pb-12 pt-2'>
          <div className='flex flex-wrap gap-2'>
            {/* {filterChipsOptions.map((option, index) => (
              <RemoveChip
                key={index}
                attribute={option.attribute}
                value={option.value}
                onClose={() => console.log("close")}
              ></RemoveChip>
            ))} */}
          </div>
        </FilterBlockContent>
      </FilterBlock>

      <FilterBlock>
        <FilterBlockHeader
          showFilterIcon={true}
          showBadge={false}
          badgeText='2 db'
          showChevron={false}
          title='Szabadszavas szűrő'
        />
        <FilterBlockContent
          className='px-3 pb-12 pt-2'
          showResetFilterButton={false}
        >
          <div>
            <Label className='sr-only' htmlFor='category-filter-serach'>
              Keresés itt:
            </Label>
            <div className='relative flex-grow'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <Search className='h-6 w-6' />
              </div>
              <Input
                className='h-[3.25rem] rounded-full pl-[3rem]'
                id='category-filter-serach'
                type='text'
                placeholder='Keresés itt: Fűnyíró'
                name='Keresés itt: Fűnyíró'
              />
            </div>
          </div>
        </FilterBlockContent>
      </FilterBlock>

      <FilterBlock>
        <Collapsible className='group/collapse'>
          <CollapsibleTrigger className='w-full'>
            <FilterBlockHeader
              showFilterIcon={true}
              showBadge={true}
              badgeText='2 db'
              showChevron={true}
              title='Szöveges checkbox'
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FilterBlockContent>
              <div className='-mx-3'>
                {/* <CheckboxGroup>
                  {checkboxOptions.map((option, index) => (
                    <CheckboxGroupItem
                      key={index}
                      label={option.label}
                      showLabel={true}
                      id={option.id}
                      imageSrc='/path/to/image.jpg'
                      showImage={true}
                    />
                  ))}
                </CheckboxGroup> */}
              </div>
            </FilterBlockContent>
          </CollapsibleContent>
        </Collapsible>
      </FilterBlock>

      <FilterBlock>
        <Collapsible className='group/collapse'>
          <CollapsibleTrigger className='w-full'>
            <FilterBlockHeader
              showFilterIcon={false}
              showBadge={false}
              badgeText='2 db'
              showChevron={true}
              title='Szöveges radio'
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FilterBlockContent>
              <div className='-mx-3'>
                <RadioGroup>
                  {/* {radioOptions.map((option, index) => (
                    <RadioGroupItem
                      key={index}
                      value={option.value}
                      id={option.id}
                      label={option.label}
                      showLabel={true}
                      imageSrc='/path/to/image.jpg'
                      showImage={true}
                    />
                  ))} */}
                </RadioGroup>
              </div>
            </FilterBlockContent>
          </CollapsibleContent>
        </Collapsible>
      </FilterBlock>

      <FilterBlock>
        <Collapsible className='group/collapse'>
          <CollapsibleTrigger className='w-full'>
            <FilterBlockHeader
              showFilterIcon={false}
              showBadge={false}
              badgeText='2 db'
              showChevron={true}
              title='Checkbox értékelés'
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FilterBlockContent>
              <div className='-mx-3'>
                {/* <CheckboxGroup>
                  {checkboxRatingOptions.map((option, index) => (
                    <CheckboxGroupRatingItem
                      key={index}
                      label={option.label}
                      showLabel={true}
                      id={option.id}
                      rating={option.rating}
                    />
                  ))}
                </CheckboxGroup> */}
              </div>
            </FilterBlockContent>
          </CollapsibleContent>
        </Collapsible>
      </FilterBlock>

      <FilterBlock>
        <Collapsible className='group/collapse'>
          <CollapsibleTrigger className='w-full'>
            <FilterBlockHeader
              showFilterIcon={false}
              showBadge={false}
              badgeText='2 db'
              showChevron={true}
              title='Radio értékelés'
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FilterBlockContent>
              <div className='-mx-3'>
                <RadioGroup>
                  {/* {radioRatingOptions.map((option, index) => (
                    <RadioGroupRatingItem
                      key={index}
                      value={option.value}
                      id={option.id}
                      label={option.label}
                      showLabel={true}
                      rating={option.rating}
                    />
                  ))} */}
                </RadioGroup>
              </div>
            </FilterBlockContent>
          </CollapsibleContent>
        </Collapsible>
      </FilterBlock>

      <FilterBlock>
        <Collapsible className='group/collapse'>
          <CollapsibleTrigger className='w-full'>
            <FilterBlockHeader
              showFilterIcon={false}
              showBadge={false}
              badgeText='2 db'
              showChevron={true}
              title='Chips checkbox'
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FilterBlockContent>
              <div className='mt-4 flex flex-wrap gap-2'>
                {/* {selectChipOptions.map((option, index) => (
                  <SelectChip key={index} label={option.label}></SelectChip>
                ))} */}
              </div>
            </FilterBlockContent>
          </CollapsibleContent>
        </Collapsible>
      </FilterBlock>

      <FilterBlock>
        <Collapsible className='group/collapse'>
          <CollapsibleTrigger className='w-full'>
            <FilterBlockHeader
              showFilterIcon={false}
              showBadge={false}
              badgeText='1 db'
              showChevron={true}
              title='Slider egypontos'
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FilterBlockContent>
              <div className='mt-4 flex flex-col gap-6'>
                <Slider defaultValue={[75]} max={100} step={10} />
                <div className='w-full'>
                  <Label htmlFor='value'>Érték</Label>
                  <Input
                    className='w-full flex-auto'
                    id='value'
                    type='number'
                  />
                </div>
                <div className='w-full'>
                  <p className='text-sm font-medium'>Érték</p>
                  <Combobox />
                </div>
              </div>
            </FilterBlockContent>
          </CollapsibleContent>
        </Collapsible>
      </FilterBlock>

      <FilterBlock>
        <Collapsible className='group/collapse'>
          <CollapsibleTrigger className='w-full'>
            <FilterBlockHeader
              showFilterIcon={false}
              showBadge={false}
              badgeText='1 db'
              showChevron={true}
              title='Slider többpontos'
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FilterBlockContent>
              <div className='mt-4 flex flex-col gap-6'>
                <Slider defaultValue={[25, 75]} max={100} step={10} />
                <div className='flex items-center justify-between gap-2'>
                  <div className='w-full'>
                    <Label htmlFor='min'>Min.</Label>
                    <Input className='flex-auto' id='min' type='number' />
                  </div>
                  <div className='mt-5'>-</div>
                  <div className='w-full'>
                    <Label htmlFor='max'>Max.</Label>
                    <Input className='flex-auto' id='max' type='number' />
                  </div>
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <div className='w-full'>
                    <p className='text-sm font-medium'>Érték</p>
                    <Combobox />
                  </div>
                  <div className='mt-5'>-</div>
                  <div className='w-full'>
                    <p className='text-sm font-medium'>Érték</p>
                    <Combobox />
                  </div>
                </div>
              </div>
            </FilterBlockContent>
          </CollapsibleContent>
        </Collapsible>
      </FilterBlock>
    </div>
  );
};

export default Filters;

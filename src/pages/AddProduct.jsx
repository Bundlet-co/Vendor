import { Input, Select, SelectSection,SelectItem, Textarea, CheckboxGroup,Checkbox, DatePicker, Button, Image, Accordion ,AccordionItem} from "@nextui-org/react";
import { FaPencil } from "react-icons/fa6";
import thumb from "../Assets/img/thumb.png"
import { BsPlus } from "react-icons/bs";

const AddProduct = () => {
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Add Product</p>
      <div className="grid grid-cols-6 gap-4 border rounded-lg my-4 p-3">
        <div className="col-span-3">
          {/* Hero Image */}
          <div className="h-72 border relative">
            <div className="w-full relative flex items-center justify-center h-full">
              <Image src={thumb} className="h-64 w-64 object-contain"/>
            </div>
            <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
              <div className="border w-10 h-10 flex items-center justify-center">
                <label htmlFor="hero_image" role="button"><FaPencil /></label>
                <input type="file" name="hero_image" id="hero_image" className="hidden" />
              </div>
            </div>
          </div>
          {/* Other Image */}
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 my-4">
            {/* Image 1 */}
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={thumb} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="hero_image" role="button"><FaPencil /></label>
                  <input type="file" name="hero_image" id="hero_image" className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 2 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={thumb} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="hero_image" role="button"><FaPencil /></label>
                  <input type="file" name="hero_image" id="hero_image" className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 3 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={thumb} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="hero_image" role="button"><FaPencil /></label>
                  <input type="file" name="hero_image" id="hero_image" className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 4 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={thumb} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="hero_image" role="button"><FaPencil /></label>
                  <input type="file" name="hero_image" id="hero_image" className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 5 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={thumb} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="hero_image" role="button"><FaPencil /></label>
                  <input type="file" name="hero_image" id="hero_image" className="hidden" />
                </div>
              </div>
            </div>
          </div>
          <Accordion>
            <AccordionItem key="1" aria-label="Supplementary product" title="Complementary Product" indicator={<BsPlus/>}>
              <div>
                hello world
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="col-span-3">
          {/* Form Input field */ }
          <div className="grid grid-cols-6 gap-8">
            <div className="col-span-3">
              <Input
                label="Product Name"
                labelPlacement="outside"
                type="text"
                placeholder="Product Name"
              />
            </div>
            <div className="col-span-3">
              <Select label="Category" labelPlacement="outside" placeholder="select a category" required>
                <SelectSection showDivider title="Fashion">
                  <SelectItem>T-shirt</SelectItem>
                  <SelectItem>Dress</SelectItem>
                  <SelectItem>Shoe</SelectItem>
                </SelectSection>
                <SelectSection showDivider title="Furniture">
                  <SelectItem>Sofa</SelectItem>
                  <SelectItem>Table</SelectItem>
                  <SelectItem>Wardrobe</SelectItem>
                </SelectSection>
                <SelectSection showDivider title="Electronic">
                  <SelectItem>Television</SelectItem>
                  <SelectItem>Phones</SelectItem>
                  <SelectItem>Laptops</SelectItem>
                </SelectSection>
              </Select>
            </div>
            <div className="col-span-full">
              <Input
                label="Slug"
                labelPlacement="outside"
                type="text"
                placeholder="Slug"
              />
            </div>
            <div className="col-span-full">
              <Textarea
                label="Sort description"
                labelPlacement="outside"
                type="text"
                placeholder="Sort description"
              />
            </div>
            <div className="col-span-full xl:col-span-3 ">
              <label htmlFor="color">Color</label>
              <div className="flex space-x-2 items-center mt-1">
                <Input
                  labelPlacement="outside"
                  type="color"
                  className="w-20 h-20"
                />
                <Input
                  labelPlacement="outside"
                  type="color"
                  className="w-20 h-20"
                />
                <Input
                  labelPlacement="outside"
                  type="color"
                  className="w-20 h-20"
                />
              </div>
            </div>
            <div className="col-span-full xl:col-span-3">
              <CheckboxGroup label="size" orientation="horizontal" size="sm">
                <Checkbox value="s">S</Checkbox>
                <Checkbox value="m">M</Checkbox>
                <Checkbox value="l">L</Checkbox>
                <Checkbox value="xl">XL</Checkbox>
                <Checkbox value="xxl">XXL</Checkbox>
              </CheckboxGroup>
            </div>
            <div className="col-span-3">
              <Input
                label="Price (in NGN)"
                labelPlacement="outside"
                type="number"
                placeholder="eg:50000"
              />
            </div>
            <div className="col-span-3">
              <Input
                label="Quantity"
                labelPlacement="outside"
                type="number"
                placeholder="eg: 5"
              />
            </div>
            <div className="col-span-3">
              <Select label="Discount Type" labelPlacement="outside" placeholder="Select discount type">
                <SelectItem>Flat</SelectItem>
                <SelectItem>Percetage</SelectItem>
              </Select>
            </div>
            <div className="col-span-3">
              <Input
                label="Discount Amount"
                labelPlacement="outside"
                type="number"
                placeholder="eg: 10%"
              />
            </div>
            <div className="col-span-full xl:col-span-2">
              <DatePicker label="Opening Date" labelPlacement="outside" showMonthAndYearPickers/>
            </div>
            <div className="col-span-3 xl:col-span-2">
              <Input
                label="Available till?"
                labelPlacement="outside"
                type="number"
                endContent="days"
                placeholder="eg: 6"
              />
            </div>
            <div className="col-span-3 xl:col-span-2">
              <Input
                label="Delivery Duration"
                labelPlacement="outside"
                type="number"
                endContent="days"
                placeholder="eg: 10"
              />
            </div>
            <div className="col-span-full">
              <Textarea
                label="Product Details"
                labelPlacement="outside"
                type="text"
                placeholder="Product description"
              />
            </div>
            <div className="col-span-full">
              <Input
                label="Product Tag ( Type and make comma to separate tags )"
                labelPlacement="outside"
                type="text"
                placeholder="Product tag"
              />
            </div>
            <div className="col-span-full">
              <Button color="primary" variant="flat" className="fon-bold">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct